const axios = require('axios');
const { getWeatherData } = require('../controllers/weatherController');

jest.mock('axios');

describe('Testando a função getWeatherData', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    test('deve retornar dados de clima para a cidade', async () => {
        const mockWeatherData = {
            name: 'Brazil',
            main: { temp: 27.5, humidity: 70 },
            weather: [{ description: 'clear sky' }],
        };

        axios.get.mockResolvedValue({ data: mockWeatherData });

        const data = await getWeatherData();
        expect(data.name).toBe('Brazil');
        expect(data.main.temp).toBe(27.5);
        expect(data.weather[0].description).toBe('clear sky');
    });

    test('deve retornar null em caso de erro', async () => {
        axios.get.mockRejectedValue(new Error('Erro na requisição'));

        const data = await getWeatherData();
        expect(data).toBeNull();
    });
});
