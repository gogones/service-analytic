
 class Webhooks {
    
         
    data = []

    setData = function(data) {
        this.data?.push(data)
    }

    getData() {
        return this.data;
    }
}

module.exports = Webhooks