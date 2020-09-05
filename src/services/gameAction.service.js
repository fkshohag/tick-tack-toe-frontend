import DataService from "../shared/services/DataService"

class GameActionService {
      static async addNewAction(step, currentPlayer, nextPlayer, pressValue) {
            const apiManager = new DataService('game-action')
            const resource = {
                  step: step,
                  currentPlayer: currentPlayer,
                  nextPlayer: nextPlayer,
                  pressValue: pressValue
            }
            await apiManager.create(resource)
      }

      static async getActions() {
            const apiManager = new DataService('game-action')
            return await apiManager.getAll()
      }
}

export default GameActionService