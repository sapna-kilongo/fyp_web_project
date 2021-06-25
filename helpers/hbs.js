const moment = require('moment')

module.exports = {
    striptags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')

    },

    formateDate: function (date, format) {
        return moment(date).format(format)

    },



    checking: function (value, meter_number) {
        if (value == 1) {

            return '<p class="text-success">paid</p>'
        }
        else if (value == 0) {
            return `<a class="btn btn-danger" href="payment/${meter_number}" >pay now<a>`
        }

    },
    
    checkingAlert: function (value, meter_number) {
        if (value == 1) {
         return `<div class="alert alert-success" role="alert"> dear ${meter_number} successful paid   </div>`
         
        }
        else if (value == 0) {
            return `<div class="alert alert-danger" role="alert"> dear ${meter_number} status is unpaid any time no water in your home  </div>`
        }
    }

}