import { db } from './db';
import { supabase } from './supabaseClient';
import { runFullSync } from './syncUtils';

/**
 * Función de hashing SHA-256 nativa de Web Crypto (compatible offline y PWA)
 */
export async function hashPassword(plainText) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Inicializa un usuario Administrador por defecto si la base de datos está vacía.
 */
export async function seedInitialAdminIfNeeded() {
  const defaultAdminEmail = 'admin@campo.com';
  const defaultAdminPass = 'admin123';
  const passHash = await hashPassword(defaultAdminPass);

  // 1. Verificar si ya existe en Dexie local
  const localUser = await db.usuarios.where('email').equalsIgnoreCase(defaultAdminEmail).first();
  if (!localUser && navigator.onLine) {
    // 2. Verificar en Supabase
    try {
      const { data: serverUsers, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', defaultAdminEmail)
        .limit(1);

      if (!error && (!serverUsers || serverUsers.length === 0)) {
        // Crear en Supabase
        const newAdmin = {
          name: 'Administrador Principal',
          email: defaultAdminEmail,
          password_hash: passHash,
          role: 'admin',
          status: 'Activo',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        const { data: inserted, error: insertErr } = await supabase
          .from('usuarios')
          .insert(newAdmin)
          .select()
          .single();

        if (!insertErr && inserted) {
          await db.usuarios.put(inserted);
          console.log('[Auth] Usuario admin por defecto creado con éxito en Supabase y local.');
        }
      } else if (serverUsers && serverUsers.length > 0) {
        await db.usuarios.put(serverUsers[0]);
      }
    } catch (e) {
      console.warn('[Auth] No se pudo verificar admin inicial en Supabase:', e.message);
    }
  }
}

/**
 * Inicia sesión validando contra Supabase (si hay internet) o Dexie local (si está offline).
 * No depende de Supabase Auth JWT, evitando la caducidad y expulsión del usuario en campo.
 */
export async function authenticateUser(email, password) {
  const cleanEmail = email.trim().toLowerCase();
  const passHash = await hashPassword(password);

  // Intentar primero con conexión a Supabase
  if (navigator.onLine) {
    try {
      const { data: users, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', cleanEmail)
        .limit(1);

      if (!error && users && users.length > 0) {
        const user = users[0];

        // Validar status
        if (user.status !== 'Activo') {
          return {
            success: false,
            message: `Acceso denegado. Tu cuenta se encuentra en estado: ${user.status}.`
          };
        }

        // Validar contraseña
        if (user.password_hash === passHash) {
          // Guardar en Dexie local para acceso offline continuo
          await db.usuarios.put(user);
          saveSessionLocally(user);
          // Disparar sincronización de fondo
          setTimeout(() => runFullSync(), 500);
          return { success: true, user };
        } else {
          return { success: false, message: 'Correo o contraseña incorrectos.' };
        }
      }
    } catch (netErr) {
      console.warn('[Auth] Fallo conexión con Supabase, intentando validación local:', netErr.message);
    }
  }

  // Si está offline o falló la conexión remota: Validar en Dexie local
  const localUser = await db.usuarios.where('email').equalsIgnoreCase(cleanEmail).first();

  if (!localUser) {
    return {
      success: false,
      message: 'Usuario no encontrado. Se requiere conexión a internet para iniciar sesión por primera vez.'
    };
  }

  if (localUser.status !== 'Activo') {
    return {
      success: false,
      message: `Acceso denegado. Tu cuenta se encuentra en estado: ${localUser.status}.`
    };
  }

  if (localUser.password_hash === passHash) {
    saveSessionLocally(localUser);
    return { success: true, user: localUser };
  }

  return { success: false, message: 'Correo o contraseña incorrectos.' };
}

/**
 * Guarda las credenciales locales de sesión (permanentes sin expiración arbitraria)
 */
export function saveSessionLocally(user) {
  localStorage.setItem('ganadera_user_id', user.id);
  localStorage.setItem('ganadera_user_name', user.name || '');
  localStorage.setItem('ganadera_user_email', user.email || '');
  localStorage.setItem('ganadera_user_role', user.role || 'operador');
}

/**
 * Obtiene los datos del usuario logueado en sesión
 */
export function getCurrentUser() {
  const id = localStorage.getItem('ganadera_user_id');
  if (!id) return null;
  return {
    id,
    name: localStorage.getItem('ganadera_user_name') || '',
    email: localStorage.getItem('ganadera_user_email') || '',
    role: localStorage.getItem('ganadera_user_role') || 'operador',
  };
}

/**
 * Cierra la sesión activa
 */
export function logoutUser() {
  localStorage.removeItem('ganadera_user_id');
  localStorage.removeItem('ganadera_user_name');
  localStorage.removeItem('ganadera_user_email');
  localStorage.removeItem('ganadera_user_role');
}
