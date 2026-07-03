# Login (`/login`)

**Route**: `/login`  
**File**: `src/routes/login.tsx`  
**Layout**: None (standalone, tanpa Navbar/Footer)  
**Auth**: No (halaman publik untuk login)  
**Bahasa**: ID + EN (i18n)

---

## Layout Halaman

Halaman login full-screen centered:

```
┌────────────────────────────────────┐
│                                    │
│       ┌──────────────────┐        │
│       │      LOGO        │        │
│       │                  │        │
│       │  Username        │        │
│       │  [_____________] │        │
│       │                  │        │
│       │  Password        │        │
│       │  [_____________] │        │
│       │                  │        │
│       │  [ Login ]       │        │
│       │                  │        │
│       │  Lupa password?  │        │
│       └──────────────────┘        │
│                                    │
└────────────────────────────────────┘
```

---

## Flow

```
1. User buka /login
2. Jika sudah login (ada token di localStorage) → redirect ke /admin/dashboard
3. Tampilkan form login
4. User input username + password
5. Submit → validasi:
   - Username: "admin"
   - Password: "admin123"
6. Jika valid:
   - Simpan { token: "authenticated", username: "admin" } ke localStorage
   - Redirect ke /admin/dashboard
7. Jika tidak valid:
   - Tampilkan error "Username atau password salah"
```

---

## Data Requirements

### Auth Token Format (localStorage)
```json
{
  "token": "authenticated",
  "username": "admin",
  "loginAt": "2026-07-02T16:00:00Z"
}
```

### Validation (Zod)
```ts
const loginSchema = z.object({
  username: z.string().min(1, 'Username wajib diisi'),
  password: z.string().min(1, 'Password wajib diisi'),
})
```

---

## Server Function

```ts
// src/server/functions/auth.ts
export const login = createServerFn({ method: 'POST' })
  .validator((data: unknown) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.username === 'admin' && data.password === 'admin123') {
      return { success: true, user: { username: 'admin' } }
    }
    return { success: false, error: 'Username atau password salah' }
  })
```

---

## States & Handling

| State | UI |
|---|---|
| Initial | Form kosong |
| Loading | Button disabled + spinner |
| Error (validation) | Border merah + error message per field |
| Error (auth) | Alert merah "Username atau password salah" |
| Success | Redirect ke `/admin/dashboard` |

---

## i18n Keys

```json
{
  "page.login.title": "Login Admin",
  "page.login.username": "Username",
  "page.login.password": "Password",
  "page.login.submit": "Masuk",
  "page.login.error": "Username atau password salah",
  "page.login.forgot": "Lupa password?"
}
```

---

## User Interactions

| Element | Aksi | Hasil |
|---|---|---|
| Input username | Type | Validate required |
| Input password | Type | Validate required + masked |
| Tombol Login | Klik | Submit form |
| Enter key | Tekan di form | Submit form |
| Error message | Muncul | Fade in animation |

---

## Security Notes (MVP)
- Hardcoded credentials — **tidak untuk production**
- Token disimpan di localStorage (rawan XSS)
- Untuk production: gunakan session-based auth atau JWT dengan refresh token
- Password sebaiknya di-hash (bcrypt) dan disimpan di database
