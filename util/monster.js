const monsters = require('../data/monsters.json')

const abilities = require('../data/abilities.json')

class Leveling {

    constructor(database) {

        this.db = database

    }

    async ensureUser(id) {

        const defaultMonster = 'Charmander'
    
        const defaultLevel = 1
    
        if (!await this.db.has(id)) {
    
            let user = {
                xp: 500,
                coins: 250,
                level: 1,
                health: 100,
                items: [],
                artifacts: [],
                win: 0,
                lose: 0,
                avatar: monsters[defaultMonster]['url'],
                monster: defaultMonster,
                monsters: {}
            }
    
            await this.db.set(id, user)
    
            await this.addMonster(id, defaultMonster, defaultLevel)

            return user
    
        }
    
        return await this.db.get(id)
    
    }
    
    async addMonster(id, name, level) {
    
        const user = await this.db.get(id)
    
        user['monster'] = name
    
        user['avatar'] = monsters[name]['url']
    
        user['monsters'][name] = {
            level: level,
            xp: monsters[name]['levels'][level - 1],
            win: ((monsters[name]['levels'][level - 1] * (level)) | 0) * 10,
            lose: ((monsters[name]['levels'][level - 1] * (level)) | 0) * 10,
            abilities: {}
        }
    
        await this.db.set(id, user)
    
        await this.addAbility(id, 'Taru Lunge')

        return
    
    }

    async updateMonster(id, name, level) {
    
        const user = await this.db.get(id)
    
        user['monster'] = name
    
        user['avatar'] = monsters[name]['url']
    
        user['monsters'][name] = {
            level: level,
            xp: monsters[name]['levels'][level - 1],
            win: ((monsters[name]['levels'][level - 1] * (level)) | 0) * 10,
            lose: ((monsters[name]['levels'][level - 1] * (level)) | 0) * 10,
            abilities: {}
        }
    
        await this.db.set(id, user)
    
        return
    
    }
    

    async getMonsters(id) {
    
        const user = await this.db.get(id)
    
        return user['monsters']
    
    }

    async getMonster(id) {
    
        const user = await this.db.get(id)
    
        return user['monsters'][user['monster']]
    
    }
    
    async removeMonster(id, name) {
    
        const user = await this.db.get(id)
    
        delete user['monsters'][name]
    
        await this.db.set(id, user)
    
        return
    
    }

    async updateCurrentMonster(id, name) {
    
        const user = await this.db.get(id)
    
        user['monster'] = name
    
        user['avatar'] = monsters[name]['url']
    
        await this.db.set(id, user)
    
        return
    
    }
    
    async addAbility(id, name) {
    
        const user = await this.db.get(id)

        const info = user['monsters'][user['monster']]
    
        user['monsters'][user['monster']]['abilities'][name] = {
            name: name,
            damage: ((((info['win'] / 10) / abilities[name]['bonus'])) / 7) | 0,
            fear: ((((info['win'] / 10) / (abilities[name]['bonus']))) / 10) | 0
        }

        await this.db.set(id, user)

        return
    
    }

    async updateAbility(id, name) {
    
        const user = await this.db.get(id)

        const info = user['monsters'][user['monster']]
    
        user['monsters'][user['monster']]['abilities'][name] = {
            name: name,
            damage: ((((info['win'] / 10) / abilities[name]['bonus'])) / 7) | 0,
            fear: ((((info['win'] / 10) / (abilities[name]['bonus']))) / 10) | 0
        }

        await this.db.set(id, user)
    
        return
    
    }

    async removeAbility(id, name) {
    
        const user = await this.db.get(id)

        delete user['monsters'][user['monster']]['abilities'][name]

        await this.db.set(id, user)
    
        return
    
    }

    async addXP(id, amount) {
    
        const user = await this.db.get(id)
    
        user['xp'] = amount
    
        await this.db.set(id, user)
    
        return
    
    }

    async getXP(id) {
    
        const user = await this.db.get(id)
    
        return user['xp']
    
    }
    
    async removeXP(id, amount) {
    
        const user = await this.db.get(id)
    
        user['xp'] = user['xp'] - amount
    
        await this.db.set(id, user)
    
        return
    
    }
    
    async addCoins(id, amount) {
    
        const user = await this.db.get(id)
    
        user['coins'] = user['coins'] + amount
    
        await this.db.set(id, user)
    
        return
    
    }

    async getCoins(id) {
    
        const user = await this.db.get(id)
    
        return user['coins']
    
    }
    
    async removeCoins(id, amount) {
    
        const user = await this.db.get(id)
    
        user['coins'] = user['coins'] - amount
    
        await this.db.set(id, user)
    
        return
    
    }

    async getAvatar(id) {
    
        const user = await this.db.get(id)
    
        return user['avatar']
    
    }

    async removeUser(id) {
    
        await this.db.delete(id)

        return
    
    }

}

module.exports = Leveling