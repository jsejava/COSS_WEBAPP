console.log("Service Worker Loaded...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "You Have A New Order-Request",
    //icon: "http://image.ibb.co/frYOFd/tmlogo.png",
    icon: "https://png.pngtree.com/template/20191219/ourmid/pngtree-happy-shop-logo-designs-fun-store-logo-template-vector-illustration-image_341573.jpg",
  });
});
