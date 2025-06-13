import {Lista} from "./lista.interface";
import {Socio} from "./socio.interface";

export interface Candidato {

  id?:number,
  evaluacion?:boolean,
  socio?:Socio,
  lista?:Lista,
  cargo?:string


}
