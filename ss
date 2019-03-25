<!-- <% products.forEach(function(product){ %>
  <div class="col-lg-3 col-md-4 col-6">
    <i class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="">
          <div class="productview">
            <br><p><%= product.productName %></p>
            <p><%= product.price %></p>
            <button type="button" class="btn btn-primary btn-sm">Buy this</button>
          </div>
        </i>
  </div>
<% }) %> -->
<!-- <ul>
<% users.forEach(function(user){ %>

<li><%= user.name %></li>
<li><%= user.name %></li>
<li><%= user.name %></li>
<% })%>

</ul> -->

<ul>


<li><%= product.productName %></li>
<li><%= product.productDescription %></li>
<li><%= product.productID %></li>
<li><%= product.price %></li>
<li><%= product.quantity %></li>
<li><%= product.category %></li>
<li><%= product.imagePath %></li>


</ul>



    <div class="col-lg-3 col-md-4 col-6">
      <i class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/pWkk7iiCoDM/400x300" alt="">
            <div class="productview">
              <br><p>Xiaomi Phone</p>
              <p>Harinath Enterprises</p>
              <p>150</p>
              <button type="button" class="btn btn-primary btn-sm">Buy this</button>
            </div>
          </i>
    </div>

    <div class="col-lg-3 col-md-4 col-6">
      <i class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" src="/images/58a2ad74398dea5de85bf2c85e844dd0">
            <div class="productview">
              <br><p>Xiaomi Phone</p>
              <p>Harinath Enterprises</p>
              <p>150</p>
              <button type="button" class="btn btn-primary btn-sm">Buy this</button>
            </div>
          </i>
    </div>


    var products;
    //res.send("helloe")
    async function findProds()
    {
      await Product.find({}, function(err, docs) {
      if (!err){
          //console.log(docs);
          products = docs;
          // process.exit()
      } else {throw err;}
  })
  }
  findProds().then(function(result,err){
    //res.send(products)
    res.render('pages/index', {user: req.body.name, products: products});
  })

  <%if (<%= product.quantity %> >= 0) { %>
    <p>Quantity Available: <%= product.quantity %></p>
  <% } %>


  .then(function(result,err){
  res.render('pages/index', {user: req.body.name});
  }).catch(err => console.log("error"))


  async function f()
  {
    let promise = new Promise(function(resolve,reject){
        p();
    }).then((err,result)=>{if (err) throw err;else resolve(1)});

    await promise
    return promise
  }
  f().then(function(err,result){
    console.log(prods.length)
    res.render('pages/index', {user : "User", products: prods})
  })

  resolve(1)}});
  t.then(function(err,result){if (err) throw err;console.log("fdf");res.send("how")})
  // await t;
  // console.log(45);
  // res.send("fd")



<div class="container">

    <h4 class="font-weight-light text-center text-lg-left mt-4 mb-0">Products available</h4>
    <hr class="mt-2 mb-5">

    <div class="row text-center text-lg-left">
      <% products.forEach(function(product){ %>
      <div class="col-lg-3 col-md-4 col-6" id="<%= product._id.toString() %>">
        <i class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="/images/<%= product.imagePath %>">
              <div class="productview">
                <br><p><%= product.productName %></p>
                <p><%= product.productDescription %></p>
                <p>Price: <%= product.price %></p>
                <p><%= product.category %></p>
                <p>Quantity: 1</p>
                <% } %>
              </div>
            </i>
      </div>
    <% })%>
  </div>
 </div>

 <div class="col-lg-3 col-md-4 col-6" id="<%= product._id.toString() %>">
   <i class="d-block mb-4 h-100">
         <img class="img-fluid img-thumbnail" src="/images/<%= product.imagePath %>">
         <div class="productview">
           <br><p><%= product.productName %></p>
           <p><%= product.productDescription %></p>
           <p>Price: <%= product.price %></p>
           <p><%= product.category %></p>
           <p>Quantity: 1</p>
           <% } %>
         </div>
       </i>
 </div>
