import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        // todo: implement this method
        // endpoint - `details/fighter/${id}.json`;
        try {
            this.endpointId = `details/fighter/${id}.json`;
            const result = await callApi(this.endpointId);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
const fighterService = new FighterService();

export default fighterService;
