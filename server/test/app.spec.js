import app from "../app";
import request from "supertest";
import jest from "jest";

//inicio de sesion en el aplicativo
describe("Inicio de sesión del usuario en el aplicativo",()=>{
  test("Debe ser exitoso el inicio de sesión con las credenciales correctas", async ()=>{
    const requestBodyUser={correo:"correo14@gmail.com", contraseña:"12345"};
    const response =await request(app).post("/auth/signin").send(requestBodyUser);
    expect(response.status).toBe(200);
  })
  test("Debe fallar el inicio de sesión debido a una contraseña incorrecta ", async ()=>{
    const requestBodyUser={correo:"correo14@gmail.com", contraseña:"123f45"};
    const response =await request(app).post("/auth/signin").send(requestBodyUser);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Contraseña incorrecta' });
  })
  test("Debe fallar el inicio de sesión debido al registro de un paciente inexistente en la base de datos", async ()=>{
    const requestBodyUser={correo:"correo14ff@gmail.com", contraseña:"12345"};
    const response =await request(app).post("/auth/signin").send(requestBodyUser);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'usuario no existe' });
  })
})
describe("Cierre de sesión del usuario en el aplicativo", () => {
  test("Debe devolver el mensaje de cierre de sesion exitoso", async () => {
    const response = await request(app).post("/logout").send();
    expect(response.status).toBe(200);
  });
});
//Endpoints de las rutas de data
describe("Get /departamentos, llamado de los departamentos de Colombia", () => {
  test("debe responder con un codigo de estado 200 y el listado de los departamentos de Colombia", async () => {
    // jest.setTimeout(10000);
    const response = await request(app).get("/departamentos").send();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Verificar que cada elemento del array sea un objeto
    response.body.forEach((cita) => {
      expect(typeof cita).toBe("object");
    });
  });
});
describe("Get /ciudades, llamado de las ciudades relacionadas a un departamento", () => {
  test("debe responder con un codigo de estado 200 y un listado de las ciudades relacionadas a un departamento seleccionado por el usuario", async () => {
    // jest.setTimeout(10000);
    const response = await request(app).get("/ciudades/5").send();
     expect(response.status).toBe(200);
     expect(Array.isArray(response.body)).toBe(true);
     expect(response.body.length).toBeGreaterThan(0);

    // // Verificar que cada elemento del array sea un objeto
    // response.body.forEach((cita) => {
    //   expect(typeof cita).toBe("object");
    // });
  });
  test("debe responder con un codigo de estado 404", async () => {
    const response = await request(app).get("/ciudades/4").send();
     expect(response.status).toBe(404);
     expect(response.body.length).toBe(undefined);
  });
});

describe("Get /correos, llamado de los correos registrados en el sistema", () => {
  test("debe responder con un codigo de estado 200 y un mensaje que indica que se puede utilizar el correo", async () => {
    const requestBody = {correo: 'johndoe@example.com'};
    const response = await request(app).post("/correos").send(requestBody);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'sigue' });
  });
  test("debe responder con un codigo de estado 200 y un mensaje que indica que no se puede utilizar el correo", async () => {
    const requestBody = {correo: 'correo5f@gmail.com'};
    const response = await request(app).post("/correos").send(requestBody);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'ocupado' });
  });
});

describe("Registro de usuario nuevo", () => {
  test("Debe ser exitoso el registro en el aplicativo con los datos completos de registro", async () => {
    const requestBodyUser = {
      nombre_completo: "Hector Oyala",
      correo: "Hector6@gmail.com",
      contraseña: "12345678",
     tipo_identificacion: "C.C",
      num_identificacion: "12345",
      fecha_nacimiento: "2000-04-18",
      genero: "Masculino",
      nacionalidad: "Colombiano",
      id_ciudad_nac: "4",
      id_ciudad_resi: "4",
      id_tipo_usuario: 1,
      id_imagen: 0,
      direccion: "Calle 28 #76-333",
      num_tel_celular: "33333",
      num_tel_fijo: "22222",
    };
    const response = await request(app)
      .post("/auth/signup")
      .send(requestBodyUser);
    expect(response.status).toBe(200);

  });
  test("Debe ser fallido el registro al intentar registrarse sin un dato obligatorio para el registro", async () => {
    const requestBodyUser = {
      nombre_completo: "Hector Oyala",
      correo: "Hector6@gmail.com",
      contraseña: "12345678",
    //  tipo_identificacion: "C.C",
      num_identificacion: "12345",
      fecha_nacimiento: "2000-04-18",
      genero: "Masculino",
      nacionalidad: "Colombiano",
      id_ciudad_nac: "4",
      id_ciudad_resi: "4",
      id_tipo_usuario: 1,
      id_imagen: 0,
      direccion: "Calle 28 #76-333",
      num_tel_celular: "33333",
      num_tel_fijo: "22222",
    };
    const response = await request(app)
      .post("/auth/signup")
      .send(requestBodyUser);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Hay datos obligatorios que faltan' });

  });
  test("Debe ser fallido el registro al utilizar un correo que ya esta registrado en el aplicativo", async () => {
    const requestBodyUser = {
      nombre_completo: "Hector Oyala",
      correo: "Hector123@gmail.com",
      contraseña: "12345678",
      tipo_identificacion: "C.C",
      num_identificacion: "12345",
      fecha_nacimiento: "2000-04-18",
      genero: "Masculino",
      nacionalidad: "Colombiano",
      id_ciudad_nac: "4",
      id_ciudad_resi: "4",
      id_tipo_usuario: 1,
      id_imagen: 0,
      direccion: "Calle 28 #76-333",
      num_tel_celular: "33333",
      num_tel_fijo: "22222",
    };
    const response = await request(app)
      .post("/auth/signup")
      .send(requestBodyUser);
    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      error: "Este correo ya esta registrado",
    });
  });
});

describe("Test de rutas de usuario logeado en el aplicativo", () => {
  let authenticatedRequest;
  beforeAll((done) => {
    authenticatedRequest = request.agent(app);
    // Simular autenticación
    authenticatedRequest
      .post("/auth/signin")
      .send({ correo: "correo14@gmail.com", contraseña: "12345" })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  test("Debe retornar la informacion del usuario que esta logeado en el aplicativo", async () => {
    const response = await authenticatedRequest.get("/userinfo").send();
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("Test de rutas de usuario logeado en el aplicativo", () => {
  let authenticatedRequest;
  beforeAll((done) => {
    authenticatedRequest = request.agent(app);
    // Simular autenticación
    authenticatedRequest
      .post("/auth/signin")
      .send({ correo: "Hector123@gmail.com", contraseña: "12345678" })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  test("debe retornar un estado 200 para el cambio de un dato de una cita en especifico", async () => {
    const citaDatatoUpdate = { hora_reg: "10:00:00" };
    const response = await authenticatedRequest
      .put("/citas/590ac9db-f438-11ed-a8e0-0c9d92139f62")
      .send(citaDatatoUpdate);
      expect(response.status).toBe(200);
  });
  test("Debe eliminar una cita registrada y responder con codigo 204", async()=>{
    const response = await authenticatedRequest.delete("/citas/3e8d16f3-f428-11ed-a8e0-0c9d92139f62").send();
    expect(response.status).toBe(204);
  })
  test("Debe retornar un estado 404 y el mensaje de cita no encontrada si el id de cita es invalido", async () => {
    const response = await authenticatedRequest
      .get("/citas/358830eb-f428-11ed")
      .send();
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'cita no encontrada'
    });
  });
  test("Debe retornar una cita en especifico cuando el usuario está autenticado y tenga citas creadas por él", async () => {
    const response = await authenticatedRequest.get("/citas/358830eb-f428-11ed-a8e0-0c9d92139f62").send();
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  test("Debe retornar la lista de citas cuando el usuario está autenticado y tenga citas creadas por él", async () => {
    const response = await authenticatedRequest.get("/citas").send();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
  test("Debe retornar un arreglo vacio en caso de que el usuario autenticado no haya agendado alguna cita en el sistema", async () => {
    const response = await authenticatedRequest.get("/citas").send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
  test("Debe retornar un estado 200 para la creacion de una cita por parte de un paciente autenticado", async () => {
    const CitaInfo={
      fecha_reg:"2023-05-20",
      hora_reg:"09:00:00",
      tipo_cita:"primera vez",
      motivo_consulta:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      estado_asistencia:"1",
      id_doctor:"f2769300-e31c-11ed-a0b5-fb1ba4924789",
      }
    const response = await authenticatedRequest.post("/citas").send(CitaInfo);
    expect(response.status).toBe(200);
  });
  test("Debe retornar un estado 500 para la creacion de una cita fallida a causa de datos faltantes", async () => {
    const CitaInfo = {
      fecha_reg: "2023-05-20",
      // hora_reg:"09:00:00",
      tipo_cita: "primera vez",
      motivo_consulta: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      estado_asistencia: "1",
      id_doctor: "f2769300-e31c-11ed-a0b5-fb1ba4924789",
    };
    const response = await authenticatedRequest.post("/citas").send(CitaInfo);
    expect(response.status).toBe(500);
  });
});

  

