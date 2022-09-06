var express = require("express");
var app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');



const DIR = 'src/uploads';
// app.use(express.static(__dirname));
// doubt first database class not mong file upload both and last build and file upload coverup
var picname;
let storage = multer.diskStorage({
 destination: (req, file, cb) => {
 cb(null, DIR);
 },
 filename: (req, file, cb) =>
	{
		picname=Date.now() + file.originalname;
		cb(null, picname);
 }
});
let upload = multer({storage: storage});

//for cors
app.use(function (req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 res.setHeader('Access-Control-Allow-Credentials', true);
 next();
});

var mongoose = require("mongoose");

var SignupSchema = new mongoose.Schema( {name:String,usertype:String,phone:String,gender:String,username: {type:String,unique:true}, pass: String}, { versionKey: false } );
var Signup = mongoose.model("signup", SignupSchema,"signup");

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded( { extended: true } ));
app.use(bodyparser.json());

app.post("/api/signup", function(req, res) {
mongoose.connect("mongodb://localhost/myprojdb");
var newsignup = new Signup( {name:req.body.nm,phone:req.body.ph,gender:req.body.gen,username: req.body.uname, pass: req.body.pass,usertype:req.body.utype} );
newsignup.save(function(err) {
if (err)
{
  console.log(err);
 res.send("Error while signing up, try again");
 }
 else
 {
 res.send("Signup Successfull");
 }
 mongoose.connection.close();
 });
});

app.post("/api/login", function(req, res) {
 mongoose.connect("mongodb://localhost/myprojdb");
 console.log(req.body);

 Signup.find({ username:req.body.un,pass:req.body.pass}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send(err);
 }
 else
 {
 console.log(data);
 res.send(data);
 mongoose.connection.close();
 }
 });
});
app.put("/api/changepassword",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);

  Signup.updateOne({username:req.body.un,pass:req.body.cpass},{$set:{pass:req.body.newp}},function(err,data){
    if(err){
      console.log(err);
      res.send("failed connection");
    }
    else{
      // res.send(res.result.nModified);
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();

  });

});
app.get("/api/searchuser",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  Signup.find({username:req.query.un},function(err, data) {
    if (err)
    {
    console.log(err);
    res.send("Failed");
    }
    else
    {
    console.log(data);
    res.send(data);
    }
    mongoose.connection.close();
  });
});
app.get("/api/memlist",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  Signup.find(function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();

  });
});

app.delete("/api/delmemb",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  Signup.remove( { _id: req.query.id },function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send("succesfully  deleted");
    }
    mongoose.connection.close();
  });
});


var AddressSchema = new mongoose.Schema( {uname:String,name:String,phone:String,pin:String,streetaddress:String,state:String,city:String,default:Number},{ versionKey: false } );
var address = mongoose.model("address", AddressSchema,"address");

app.put("/api/updatedefault",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  address.updateOne({_id:req.body.id},{$set:{default:req.body.default}},function(err,data){
    if(err){
      console.log(err);
      res.send("failed connection");
    }
    else{
      // res.send(res.result.nModified);
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();

  });

});
app.delete("/api/deleteaddress",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  address.remove( { _id: req.query.id },function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send("succesfully  deleted");
    }
    mongoose.connection.close();
  });
});

app.get("/api/getaddress",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  address.find({uname:req.query.uname},function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();

  }).sort({"default":-1});
});
app.get("/api/getaddressbyid",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);

  address.find({_id:req.query.id},function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();

  }).sort({"default":-1});
});
app.post("/api/addaddress", function(req, res) {
mongoose.connect("mongodb://localhost/myprojdb");
var newaddress = new address( { uname:req.body.uname, name: req.body.name, phone:req.body.phone,pin:req.body.pin,streetaddress:req.body.streetaddress,state:req.body.state,city:req.body.city,default:req.body.default} );
newaddress.save(function(err) {
if (err)
{
  console.log(err);
  res.send("Error while signing up, try again");
 }
 else
 {
 res.send("Address added Successfull");
 }
 mongoose.connection.close();
 });
});

var CategorySchema=new mongoose.Schema({catname:String ,catpic:String },{versionKey:false});
var  managecat=mongoose.model("managecat",CategorySchema,"managecat");
// file upload in database line no 11let storage is imp for file upload
app.post("/api/addcat",upload.single('photo'),function(req,res)
     {
       console.log("work");
       mongoose.connect("mongodb://localhost/myprojdb");
       if(!req.file){
         picname="noimg.jpg";
       };
       var newmanagecat=new managecat({catname:req.body.catname,catpic:picname});
       newmanagecat.save(function(err){
       if(err){
         console.log(err);
         res.send("Failed");
       }
       else{
         console.log("sa");
         res.send("succesfully inserted");
       }
       mongoose.connection.close();

     });
 });
 app.put("/api/updatecat",upload.single('photo'), function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
if(!req.file){
  picname=req.body.oldname;
}
else{
  if(req.body.oldname!="noimg.jpg"){
    fs.unlink('src/uploads/'+req.body.oldname,(err)=>{
      if(err)throw (err);
      console.log('file was deleted');
    }
    );
  }
}
managecat.update({_id:req.body.catid},{$set :{catname:req.body.catname,catpic:picname}},function(err){
    if(err){
      console.log(err);
      res.send("failed connection");
    }
    else
      res.send("Categories Updated");
    mongoose.connection.close();
  });
});
 app.get("/api/getcat",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  managecat.find(function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();

  });
});


app.get("/api/getcat1",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  managecat.find({_id:req.query.catid},function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});
app.delete("/api/delcat",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  managecat.remove( { _id: req.query.id },function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send("succesfully  deleted");
    }
    mongoose.connection.close();
  });
});
var SubCategorySchema=new mongoose.Schema({catid:String ,subcatname:String ,subcatpic:String },{versionKey:false});
var  managesubcat=mongoose.model("managesubcat",SubCategorySchema,"managesubcat");
app.put("/api/updatesubcat",upload.single('photo'), function(req,res){
 mongoose.connect("mongodb://localhost/myprojdb");
 console.log(req.query);
if(!req.file){
 picname=req.body.oldname;
}
else{
 if(req.body.oldname!="noimg.jpg"){
   fs.unlink('src/uploads/'+req.body.oldname,(err)=>{
     if(err)throw (err);
     console.log('file was deleted');
   }
   );
 }
}
managesubcat.update({_id:req.body.subcatid},{$set :{subcatname:req.body.subcatname,subcatpic:picname,catid:req.body.catid}},function(err){
   if(err){
     console.log(err);
     res.send("failed connection");
   }
   else
     res.send("SubCategories Updated");
   mongoose.connection.close();
 });
});
app.delete("/api/delsubcat",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  managesubcat.remove( { catid: req.query.id },function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send("succesfully  deleted");
    }
    mongoose.connection.close();
  });
});
app.delete("/api/delonlysubcat",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  managesubcat.remove( { _id: req.query.id },function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send("succesfully  deleted");
    }
    mongoose.connection.close();
  });
});
app.post("/api/addsubcat",upload.single('photo'),function(req,res)
     {
       mongoose.connect("mongodb://localhost/myprojdb");
       if(!req.file){
         picname="noimg.jpg";
       };
       var newmanagesubcat=new managesubcat({catid:req.body.catid, subcatname:req.body.subcatname,subcatpic:picname});
       newmanagesubcat.save(function(err){
       if(err){
         console.log(err);
         res.send("Failed");
       }
       else{
         res.send("succesfully inserted");
       }
       mongoose.connection.close();

     });
 });

//  app.get("/api/getsubcat",function(req,res){
//   mongoose.connect("mongodb://localhost/myprojdb");
//   console.log(req.query);
//   managesubcat.find({catid:req.query.catid},function(err,data){
//     if(err){
//       console.log(err);
//       res.send("failed");
//     }
//     else{
//       console.log(data);
//       res.send(data);
//     }
//     mongoose.connection.close();

//   });
// });
app.get("/api/getsubcat",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);

  managesubcat.find({catid:req.query.catid},function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();

  });
});

var ProductSchema = new mongoose.Schema( {catid:String,subcatid:String,selleruname:String ,pname:String,pprice:Number,pdesc:String,pdiscount:Number,pstock:Number,ppic:String,addeddate:String,trending:Number}, { versionKey: false } );
var manageproducts = mongoose.model("manageproducts", ProductSchema,"manageproducts");

app.put("/api/updatetrend",function(req,res){
mongoose.connect("mongodb://localhost/myprojdb");
var updatelist=req.body;
for(let x=0;x<updatelist.length;x++)
{
manageproducts.updateOne({_id:updatelist[x].pid},{$inc: {"trending":+1}},function(err,data){
if (err)
{
 console.log(err);
 res.send("Failed");
}
else
{
 console.log(data);
 mongoose.connection.close();
}

});
}
 res.send("Successfully Updated");
});
app.get("/api/gettrendingproducts",function(req,res){
 mongoose.connect("mongodb://localhost/myprojdb");
 console.log(req.query);
 manageproducts.find(function(err,data){
   if(err){
     console.log(err);
     res.send("failed");
   }
   else{
     console.log(data);
     res.send(data);
   }
   mongoose.connection.close();

 }).sort({"trending":-1}).limit(6);
});

app.get("/api/searchproduct",function(req,res){
 mongoose.connect("mongodb://localhost/myprojdb");
 console.log(req.query);
 console.log("hello");
 // db.users.find(name: new RegExp(search));
// ({name: { $regex: '.*' + name + '.*' } }).limit(5);
var pname=req.query.pname;
 manageproducts.find({pname:/.*pname.*/},function(err,data){
   if(err){
     console.log(err);
     res.send("failed");
   }
   else{
     console.log(data);
     res.send(data);
   }
   mongoose.connection.close();

 }).sort({"trending":-1}).limit(6);
});
app.get("/api/getmostsellingproducts",function(req,res){
 mongoose.connect("mongodb://localhost/myprojdb");
 console.log(req.query);
 manageproducts.find({selleruname:req.query.selleruname},function(err,data){
   if(err){
     console.log(err);
     res.send("failed");
   }
   else{
     console.log(data);
     res.send(data);
   }
   mongoose.connection.close();

 }).sort({"trending":-1}).limit(6);
});
app.get("/api/getsellerproducts",function(req,res){
 mongoose.connect("mongodb://localhost/myprojdb");
 console.log(req.query);
 manageproducts.find({selleruname:req.query.selleruname},function(err,data){
   if(err){
     console.log(err);
     res.send("failed");
   }
   else{
     console.log(data);
     res.send(data);
   }
   mongoose.connection.close();

 }).sort({"discount":1});
});
app.post("/api/addproduct",upload.single('photo'),function(req,res)
     {
       mongoose.connect("mongodb://localhost/myprojdb");
       if(!req.file){
         picname="noimg.jpg";
       };
       var d = new Date();

       var newmanageproduct=new manageproducts({catid:req.body.catid, selleruname:req.body.selleruname, addeddate:d,subcatid:req.body.subcatid,ppic:picname,pname:req.body.pname,pstock:req.body.stock,pprice:req.body.price,pdiscount:0, pdesc:req.body.description,trending:0});
       newmanageproduct.save(function(err){
       if(err){
         console.log(err);
         res.send("Failed");
       }
       else{
         res.send("succesfully inserted");
       }
       mongoose.connection.close();

     });
 });
 //update stock after the successful of order
 app.put("/api/updatestock",function(req,res){
 mongoose.connect("mongodb://localhost/myprojdb");
 var updatelist=req.body;
 for(let x=0;x<updatelist.length;x++)
 {
 manageproducts.updateOne({_id:updatelist[x].pid},{$inc: {"pstock":-updatelist[x].pqty}},function(err,data){
 if (err)
 {
  console.log(err);
  res.send("Failed");
 }
 else
 {
  console.log(data);
  mongoose.connection.close();
 }

 });
 }
  res.send("Successfully Updated");
 });

app.delete("/api/delprod",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  manageproducts.remove( { catid: req.query.id },function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send("succesfully  deleted");
    }
    mongoose.connection.close();
  });
});
app.delete("/api/delsubcatprod",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  manageproducts.remove( { subcatid: req.query.id },function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send("succesfully  deleted");
    }
    mongoose.connection.close();
  });
});
app.delete("/api/deleteproduct",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  manageproducts.remove( { _id: req.query.id },function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send("succesfully  deleted");
    }
    mongoose.connection.close();
  });
});
app.put("/api/updateproducts",upload.single('photo'), function(req,res){
 mongoose.connect("mongodb://localhost/myprojdb");
 console.log(req.query);
if(!req.file){
 picname=req.body.oldname;
}
else{
 if(req.body.oldname!="noimg.jpg"){
   // fs.unlink('src/uploads/'+req.body.oldname,(err)=>{
   //   if(err)throw (err);
   //   console.log('file was deleted');
   // }
   // );
 }
}
manageproducts.update({_id:req.body.pid},{$set :{catid:req.body.catid,subcatid:req.body.subcatid, pprice:req.body.pprice,pname:req.body.pname,pdesc:req.body.pdesc,pdiscount:req.body.pdiscount,pstock:req.body.pdiscount ,ppic:picname}},function(err){
   if(err){
     console.log(err);
     res.send("failed connection");
   }
   else
     res.send("Products Updated");
   mongoose.connection.close();
 });
});

 app.get("/api/getproducts",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  manageproducts.find({subcatid:req.query.subcatid},function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();

  });
});
app.get("/api/getallproducts",function(req,res){
 mongoose.connect("mongodb://localhost/myprojdb");
 console.log(req.query);
 manageproducts.find(function(err,data){
   if(err){
     console.log(err);
     res.send("failed");
   }
   else{
     console.log(data);
     res.send(data);
   }
   mongoose.connection.close();

 });
});
app.get("/api/productdetails",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  manageproducts.find({_id:req.query.pid},function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();

  });
});

var CartSchema = new mongoose.Schema( {pid:String,pname:String,pqty:Number,ptotal:Number,pprice:Number,ppic:String,uname:String,selleruname:String}, { versionKey: false } );
var cart = mongoose.model("cart", CartSchema,"cart");
app.delete("/api/deletecartitem",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  cart.remove( { _id: req.query.cartid },function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send("succesfully  deleted");
    }
    mongoose.connection.close();
  });
});
app.delete("/api/emptycart", function(req, res) {
  mongoose.connect("mongodb://localhost/myprojdb");
  cart.remove({ uname:req.query.uname }, function(err, data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send("remove from cart successfully");
    }
    mongoose.connection.close();
  });
});


app.put("/api/updatecart", function(req, res) {
  mongoose.connect("mongodb://localhost/myprojdb");
  cart.update({ _id:req.body.cartid }, { $set: {pqty: req.body.pqty,ptotal:req.body.ptotal}},function(err,data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      res.send(data);
    }
    mongoose.connection.close();
  });
});
app.get("/api/getcartitems",function(req,res){
  mongoose.connect("mongodb://localhost/myprojdb");
  console.log(req.query);
  cart.find({uname:req.query.uname},function(err,data){
    if(err){
      console.log(err);
      res.send("failed");
    }
    else{
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();

  });
});

app.post("/api/addtocart", function(req, res) {
  mongoose.connect("mongodb://localhost/myprojdb");
  var newcart = new cart( {pid:req.body.pid,pprice:req.body.pprice,pname:req.body.pname,pqty:req.body.pqty,ptotal:req.body.ptotal, ppic: req.body.ppic,uname:req.body.uname,selleruname:req.body.selleruname} );
  newcart.save(function(err) {
  if (err)
  {
    console.log(err);
   res.send("Did not added to cart");
   }
   else
   {
   res.send("Add  to cart  succesfully");
   }
   mongoose.connection.close();
   });
  });

  var OrderSchema=new mongoose.Schema( {billtotal:String,address:String,uname:String,orderdate:String,paymentmode:String,status:String,cardno:String,companyname:String,holdername:String,expirydate:String,cvvno:String}, {versionKey:false} );
  var order=mongoose.model("order",OrderSchema,"order");

  app.put("/api/updateStatus", function(req, res) {
    mongoose.connect("mongodb://localhost/myprojdb");
    order.updateOne({ _id: req.body.id}, { $set: { status: req.body.newstatus}}, function(err, data) {
      if (err)
      {
        console.log(err);
        res.send("Failed");
      }
      else
      {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    });
  });

  app.post("/api/order", function(req, res) {
    mongoose.connect("mongodb://localhost/myprojdb");
  	var d = new Date();

    var neworder = new order( {billtotal:req.body.billtotal,address:req.body.address,uname:req.body.uname,orderdate:d,paymentmode:req.body.paymentmode,status:"Payment received, processing",cardno:req.body.cardno,companyname:req.body.companyname,holdername:req.body.holdername,expirydate:req.body.expirydate,cvvno:req.body.cvvno} );

    neworder.save(function(err) {
      if (err)
      {
        console.log(err);
        res.send("Error Occurs");
      }
      else
      {
        res.send("ok");
      }
      mongoose.connection.close();
    });
  });

  app.get("/api/getordernum", function(req, res) {
    mongoose.connect("mongodb://localhost/myprojdb");
    order.find({ uname: req.query.uname }, function(err, data) {
      if (err)
      {
        console.log(err);
        res.send("Failed");
      }
      else
      {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    }).sort({"orderdate":-1});
  });

  app.get("/api/getallorders", function(req, res) {
    mongoose.connect("mongodb://localhost/myprojdb");
    order.find(function(err, data) {
      if (err)
      {
        console.log(err);
        res.send("Failed");
      }
      else
      {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    });
  });

  app.get("/api/getOrdersByUser", function(req, res) {
    mongoose.connect("mongodb://localhost/myprojdb");
    order.find({ uname:req.query.uname }, function(err, data) {
      if (err)
      {
        console.log(err);
        res.send("Failed");
      }
      else
      {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    }).sort({"orderdate":-1});
  });

  var ReviewSchema = new mongoose.Schema( {prodid:String,rating:Number,review:String,date:String,helpful:String,uname:String}, { versionKey: false } );
  var review = mongoose.model("review", ReviewSchema,"review");

  app.post("/api/addreview" ,function(req, res){
    mongoose.connect("mongodb://localhost/myprojdb");
    var d = new Date();
    var newreview=new review( {prodid:req.body.prodid,rating:req.body.rating,review:req.body.review,date:d,helpful:req.body.helpful,uname:req.body.uname});
    newreview.save(function(err) {
      if(err){
        console.log(err);
        res.send("Error Occurs");
      }
      else{
        res.send("ok");
      }
      mongoose.connection.close();
    });
  });

  var OrderdetailsSchema = new mongoose.Schema( {orderid:String,pid:String,pname:String,pprice:Number,pqty:Number,ptotal:Number,ppic:String,uname:String ,selleruname:String}, { versionKey: false } );
  var orderdetails = mongoose.model("orderdetails", OrderdetailsSchema,"orderdetails");
  // insert order details for ordersuccess component
  app.post("/api/orderitems",function(req,res)
  {
  mongoose.connect("mongodb://localhost/myprojdb");
  var neworder=req.body;

  orderdetails.insertMany(neworder, function (err, docs) {
        if (err){
            return console.error(err);
        } else {
          console.log("Multiple documents inserted to Collection");
  res.send("Successfully inserted");
        }
      });
  });
  app.get("/api/getordersofseller", function(req, res) {
    mongoose.connect("mongodb://localhost/myprojdb");

    orderdetails.find({ selleruname:req.query.selleruname }, function(err, data) {
      if (err){
        console.log(err);
        res.send("Failed");
      }
      else
      {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    })
  });

  app.get("/api/getorderdetailsbyuser", function(req, res) {
    mongoose.connect("mongodb://localhost/myprojdb");
    orderdetails.find({ orderid: req.query.orderid }, function(err, data) {
      if (err)
      {
        console.log(err);
        res.send("Failed");
      }
      else
      {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    });
  });

app.listen(3000, function () {
 console.log('Node.js server is running on port 3000');
});
