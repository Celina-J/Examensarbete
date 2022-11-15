import mysql from 'mysql';

export default class DB{
    constructor(){
        this.con = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'provianten'

        });
        
    }
    query(sql, values){
        return new Promise((resolve, reject) => {
            this.con.query(sql, values, function (error, result){
                if(error) reject({success: false, data: [], message: error});

                resolve({success: true, data: result, message: ''});
            })
        })
    }
}

