import { ProcesoElectoral } from "./procesoElectoral.interface";
import {Candidato} from "./candidato.interface";
import { Propuesta } from "./propuesta.interface";

export interface Lista{
    id?:number,
    nombre?:string,
    procesoElectoral?:ProcesoElectoral,
    rutaArchivo?: string,
    candidatos?:Candidato[]
}
