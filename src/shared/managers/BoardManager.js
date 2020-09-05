import DataService from "../services/DataService"

class BoardManager {
      static clearBoard() {
            const api = new DataService('game-action/delete')
            api.delete()
      }
}

export default BoardManager