export const filterByType = (generic, search) => {
    return generic.filter(ele => ele.name.includes(search))
}


export const getBillSearch = (customers, bills, searchTerm) => {
    let resultfinal = []
    const customerFilter = customers.filter((customer) => {
        return customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    customerFilter.forEach((customer) => {
        const result = bills.filter((bill) => {
            return bill.customer === customer._id
        })

        resultfinal = resultfinal.concat(result)
    })

    return resultfinal
}




export const sortByType = (customers, type) => {
    if (type === "a-z") {
        customers.sort((a, b) => {
            return a.name.localeCompare(b.name)
        })

    } else if (type === "z-a") {
        customers.sort((a, b) => {
            return b.name.localeCompare(a.name)
        })
    }
    else if (type === "price-high-to-low") {
        customers.sort((a, b) => {
            return b.price - a.price
        })


    } else if (type === "price-low-to-high") {
        customers.sort((a, b) => {
            return a.price - b.price
        })

    }
}
