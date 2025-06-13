import { Agencia } from "./agencia.interface";
import { Persona } from "./persona.interface";

export interface Socio  {
    id?:number;
    fechaIngreso?:Date,
    saldoAporte?:number,
    persona?:Persona,
    agencia?:Agencia
}
