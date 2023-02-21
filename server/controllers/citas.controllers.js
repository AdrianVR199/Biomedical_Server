import { pool } from "../db.js"


export const getCitas = (req, res)=>{
    res.send('obteniendo citas')
}

export const getCita = (req, res)=>{
    res.send('obteniendo una cita')
}

export const createCita = (req, res)=>{
    
    res.send('creando citas')
}

export const updateCita = (req, res)=>{
    res.send('actualizando cita')
}

export const deleteCita = (req, res)=>{
    res.send('eliminando cita')
}