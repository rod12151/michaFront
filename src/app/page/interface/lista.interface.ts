import { ProcesoElectoral } from "./procesoElectoral.interface";
import {Candidato} from "./candidato.interface";

export interface Lista{
    id?:number,
    nombre?:string,
    procesoElectoral?:ProcesoElectoral,
    rutaArchivo?: string,
    candidatos?:Candidato
}
