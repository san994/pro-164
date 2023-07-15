AFRAME.registerComponent("shoot",{
    init:function(){
     this.shoot()
    },
    shoot:function(){
      window.addEventListener("keydown",(e)=>{
        if(e.key==="z"){
            var bullet = document.createElement("a-entity");

            bullet.setAttribute("geometry",{
                primitive:"sphere",
                radius:0.1
            })
            bullet.setAttribute("material",{color:"black"});
            
            var camera = document.querySelector("#camera");
            pos = camera.getAttribute("position")
            
            bullet.setAttribute("position",{
                x:pos.x,
                y:pos.y,
                z:pos.z
            })

            var camera3D = document.querySelector("#camera").object3D;
            var direction = new THREE.Vector3();

            camera3D.getWorldDirection(direction);
            bullet.setAttribute("velocity",direction.multiplyScalar(-10));

            bullet.setAttribute("dynamic-body",{mass:0});
            bullet.addEventListener("collide",this.removebullet);

            var scene = document.querySelector("#scene");
            scene.appendChild(bullet);

            this.shootSound()
        }
      })
    },
    removebullet:function(e){
        var element = e.detail.target.el;

       
        //element which is hit
        var elementHit = e.detail.body.el;

        console.log(elementHit.getAttribute("position"))
        
        if (elementHit.id.includes("box")) {
          elementHit.setAttribute("material", {
            opacity: 1,
            transparent: true,
          });
        }
        
        var scene = document.querySelector("#scene");
        scene.removeChild(element)

        
        var pos = elementHit.getAttribute("position");
        var rotate = elementHit.getAttribute("rotation");
        var paint = document.createElement("a-image");
        
        paint.setAttribute("position",{
          x:pos.x,
          y:pos.y,
          z:pos.z+0.5
        });
        paint.setAttribute("rotation",{
          x:rotate.x,
          y:rotate.y,
          z:rotate.z
        })
        paint.setAttribute("height",1);
        paint.setAttribute("width",1)
        paint.setAttribute("material",{src:"./images/paint.png"});

        scene.appendChild(paint);
    },
    shootSound:function(){
        var entity = document.querySelector("#sound");
        entity.components.sound.playSound();
    }
})