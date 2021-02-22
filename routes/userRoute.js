const express = require('express');
const router = express.Router();

const db = require('../models')

router.get('/', async (req, res) => {
    try {
        // Here orm_users is table name and users is variable
        const user = await db.ui_orm_users.findAll()
        res.render('index', {
            title: 'Users',
            users: user
        })
    } catch (e) {
        console.log(e);
    }
})

router.get('/add-user', (req, res) => {
    res.render('add_user', {
        title: 'Add User'
    })
})

router.post('/add-user', async (req, res) => {
    try {
        const user = await db.ui_orm_users.create({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile
        })
        res.render('add_user', { user, title: 'Add User', msg: 'User Inserted Successfully' })
    } catch (e) {
        console.log(e);
    }
})

router.get('/edit-user/:id', async (req, res) => {
    try {
        const user = await db.ui_orm_users.findAll({
            where: {
                id: req.params.id
            }
        })
        res.render('edit_user', {
            title: 'Edit User',
            users: user[0]
        })
    } catch (e) {
        
    }
})

router.post('/edit-user/:id', async (req, res) => {
    try {
        const user = await db.ui_orm_users.update(
            { 
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile 
            }, 
            {
                where: { id: req.params.id }
            }
            )
        if (!user) {
            res.status(404).send('User Not Found!')
        }   
        res.render('edit_user', {
            title: 'Edit User',
            msg: 'User Updated successfully!',
            users: user
        })
    } catch (e) {
        console.log(e);
    }
    
})

router.get('/delete-user/:id', async (req, res) => {
    try {
        const user = await db.ui_orm_users.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/')
    } catch (e) {
        console.log(e);
    }
})

module.exports = router