# Roadmap for `/authentication` endpoints

- [x] `GET  /authentication/v1/keypad`
- [x] `POST /authentication/v1/keypad/:structure_id` (without `actionUUID`)
- [ ] `POST /authentication/v1/keypad/otpsms/refresh_otp`
- [ ] `POST /authentication/v1/keypad/otpsms/request/:structure_id`
- [ ] `POST /authentication/v1/keypad/otpsms/validate/:structure_id`
- [ ] `POST /authentication/v1/scad/retain_device`
- [x] `POST /authentication/v1/scad/retain_device/first_co`
- [x] `POST /authentication/v1/finalize_co_sp`
- [ ] `POST /authentication/v1/finalize_sp`
- [ ] `POST /authentication/v1/finalize_otp`
- [ ] `POST /authentication/v1/refresh_token`
- [ ] `GET  /authentication/v1/route/reset-pwd`
- [ ] `POST /authentication/v1/signout`
