// handler function to uploads image to aws s3

const imageUpload = (req) => {
    return new Promise((resolve, reject) => {
        var buf = Buffer.from(req.body.base64.replace(/^data:image\/\w+;base64,/, ""),'base64')
        var data = {
            Key: `${req.body.contact.mobile_number}_${req.body.contact.emails}/license.png`, 
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        };
        s3Bucket.putObject(data, function(err, data){
            if (err) { 
                console.log('Error uploading data: ', data);
                reject({ack: 0, msg: "oops! something went wrong, couldn't upload image"}) 
            } else {
                resolve({ack: 1, msg: 'uploaded image successfully'});
            }
        });
    })
}

exports.imageUploadHandler = async(req, res) => {
    const result = await imageUpload(req);
    
    if(result.ack === 1){
        res.send(result);
    } else if(result.ack === 0) {
        res.send(result)
    }
}