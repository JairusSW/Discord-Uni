const numeral = require('numeral')

const getUserFromMention = (mention, client) => {

    try {

        if (!mention) return

        if (mention.startsWith('<@') && mention.endsWith('>')) {

            mention = mention.slice(2, -1)

            if (mention.startsWith('!')) {

                mention = mention.slice(1)
                
            }

            return client.users.cache.get(mention)
            
        }
        
        return undefined

    } catch {

        return

    }

}

const formatNumber = async (number) => {

    return numeral(number).format('0,0')

}

module.exports = {
    getUserFromMention: getUserFromMention,
    formatNumber: formatNumber
}