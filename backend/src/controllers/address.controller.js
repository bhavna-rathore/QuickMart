import { v4 as uuid } from "uuid";

export const getAddresses = (req, res) => {
    const user = req.user;
    res.json({ addresses: user.addresses || [] });
};

export const addAddress = (req, res) => {
    const user = req.user;
    const address = req.body;

    const newAddress = {
        _id: uuid(),
        ...address
    };

    user.addresses.push(newAddress);

    return res.json({ addresses: user.addresses });
};

export const updateAddress = (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const addressUpdates = req.body;

    const index = user.addresses.findIndex(a => a._id === id);
    if (index === -1) return res.status(404).json({ errors: ["Address not found"] });

    user.addresses[index] = { ...user.addresses[index], ...addressUpdates };

    return res.json({ addresses: user.addresses });
};

export const deleteAddress = (req, res) => {
    const user = req.user;
    const { id } = req.params;

    user.addresses = user.addresses.filter(a => a._id !== id);

    return res.json({ addresses: user.addresses });
};
