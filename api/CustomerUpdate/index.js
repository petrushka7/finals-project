const customers = require('../data/customers.json');

module.exports = async function (context, req) {
    let putCustomer = req.body;
    let id = +req.params.id;
    let status = false;




    for (let i = 0, len = customers.length; i < len; i++) {
        if (customers[i].id === id) {
            customers[i] = putCustomer;
            status = true;
            break;
        }
    }
    
    context.res = {
        headers : {
          'Content-Type': 'application/json'   
        },
        // status: 200, /* Defaults to 200 */
        body: {
            status: status
        }
    };
}