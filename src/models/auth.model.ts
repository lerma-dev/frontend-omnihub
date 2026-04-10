// models/auth.model.ts
export interface Login {
  correo: string;
  password: string;
}

export interface Register {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
}