export default function users(req, res){
        res.status(200).json(
            {
                id:1,
                name: 'Marcos',
                email: 'marcoshmarcarini@hotmail.com',
                password: '#r4e3w2q1'
            },
        )
}