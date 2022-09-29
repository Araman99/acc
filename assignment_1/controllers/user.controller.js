const fs = require('fs');

let userData = {};
fs.readFile(`${__dirname}/../assets/data.json`, 'utf8', (err, data) => {
    userData = JSON.parse(data);
});


module.exports.getRandomUserData = (req, res) => {
    const random = Math.floor(Math.random() * userData.length);
    res.status(200).send({
        success: true,
        message: "Random your data",
        data: userData[random]
    });
}

module.exports.getAllData = (req, res) => {
    const { limit } = req.query;
    if (limit >= userData.length) {
        res.status(502).send({
            success: false,
            message: "Data limit cross"
        });
    } else if (limit >= 0) {
        res.status(200).send({
            success: true,
            message: "success",
            data: userData.slice(0, limit)
        });
    } else {
        res.status(200).send({
            success: true,
            message: "success",
            data: userData
        });
    }
}

module.exports.saveUserData = (req, res) => {
    const { name, gender, contact, address, photoUrl } = req.body;
    if (name && gender && contact && address && photoUrl) {
        const newUser = {
            id: userData.length + 1,
            name,
            gender,
            contact,
            address,
            photoUrl
        };
        userData = [...userData, newUser];
        fs.writeFile(`${__dirname}/../assets/data.json`, JSON.stringify(userData), (err) => {
            console.log("New data added.");
        })
        res.status(200).send({
            success: true,
            message: "success",
            data: userData
        });
    }
    else {
        res.status(404).send({
            success: false,
            message: "All the required properties are not present in the body",
        });
    }

    // const exists = userData.filter(user => user.id === Number(newUser.id)).length > 0;
    // if (!exists) {
    //     userData = [...userData, newUser];
    //     fs.writeFile(`${__dirname} /../ assets / data.json`, JSON.stringify(userData), (err) => {
    //         console.log("New data added.");
    //     })
    //     res.send(userData);
    // } else {
    //     res.send("This user already exists");
    // }
}

module.exports.updateSingleUser = (req, res) => {
    const { id } = req.params;
    const { name, gender, contact, address, photoUrl } = req.body;
    const exists = userData.filter(user => user.id === Number(id)).length > 0;

    if (exists) {
        const updateData = userData.map(user => {
            if (user.id === Number(id)) {
                return {
                    ...user,
                    name,
                    gender,
                    contact,
                    address,
                    photoUrl
                };
            }
            return user;
        })

        fs.writeFile(`${__dirname}/../assets/data.json`, JSON.stringify(updateData), (err) => {
            console.log("User data updated");
        })
        res.status(200).send({
            success: true,
            message: "success",
            data: updateData
        });
    }
    else {
        res.status(404).send({
            success: true,
            message: "user id not valid!!!",
            data: updateData
        });
    }
}

module.exports.deleteUserData = (req, res) => {

    const { id } = req.params;
    const exists = userData.filter(user => user.id === Number(id)).length > 0;

    if (exists) {
        const newData = userData.filter(user => user.id !== Number(id))
        res.status(200).send({
            success: true,
            message: "Selected user successfully deleted",
        })
        fs.writeFile(`${__dirname}/../assets/data.json`, JSON.stringify(newData), (err) => {
            console.log("Data deleted!!!");
        })
    }
    else {
        res.status(404).send({
            success: false,
            message: "Invalid user id"
        })
    }

}

module.exports.updateMultipleUser = (req, res) => {
    const data = req.body;

    for (const updateData of data) {
        const index = userData.findIndex(user => user.id === Number(updateData.id));
        userData[index] = updateData;
    }
    res.status(200).send({
        success: true,
        message: "success"
    });
    fs.writeFile(`${__dirname}/../assets/data.json`, JSON.stringify(userData), (err) => {
        console.log("All data updated!!!");
    })
}