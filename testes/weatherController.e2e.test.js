const request = require("supertest");
const app = require("../src/app");
const axios = require("axios");

jest.mock("axios");

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Testando a rota /data", () => {
  test("Deve retornar dados de clima com status 200", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        name: "Brazil",
        main: { temp: 27.5, humidity: 70 },
        weather: [{ description: "clear sky" }],
      },
    });

    const response = await request(app).get("/data");
    expect(response.status).toBe(200);
    expect(response.body.city).toBe("Brazil");
    expect(response.body.temperature).toBe(27.5);
    expect(response.body.description).toBe("clear sky");
    expect(response.body.humidity).toBe(70);
  });

  test("Deve retornar erro 500 quando falhar na requisição", async () => {
    axios.get.mockRejectedValueOnce(new Error("Erro na requisição"));

    const response = await request(app).get("/data");
    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Erro ao obter dados climáticos");
  });
});
