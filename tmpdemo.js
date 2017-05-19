var loc = [120.374433, 36.127131];
var randomFun = function (Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
};
var getRandomColor = function(){
            var rd = randomFun(0, 10);
            if(rd < 2){
                return new Cesium.Color.fromCssColorString('#ff0000');
            }else if(rd < 8){
                return new Cesium.Color.fromCssColorString('#00ff00');
            }else{
                return new Cesium.Color.fromCssColorString('#0000ff');
            }
        }

var getRandomColor2 = function(){
            var rd = randomFun(0, 10);
            if(rd < 2){
                return '#ff0000';
            }else if(rd < 8){
                return '#00ff00';
            }else{
                return '#0000ff';
            }
        }

function start(){


    var gisurl = 'http://192.168.1.6:6080/arcgis/rest/services/qdpng/MapServer';
    var gisurl3='http://192.168.1.6:6080/arcgis/rest/services/qingdaoMapbuquanser/MapServer';
    //var gisurl2 = 'http://localhost:6080/arcgis/rest/services/jz/MapServer';
    //var routeurl = 'http://localhost:6080/arcgis/rest/services/hfl/MapServer';
    var gisurl4 =' http://localhost:6080/arcgis/rest/services/qingdaoBuildDemo/MapServer';
    var gisurl5 =' http://localhost:6080/arcgis/rest/services/bigeMapDemo/MapServer';
    var token = 'gHM7aiugXxSvwAPjwPngw4Twymsc6IqjJUjSH0Jz4XlW-FTVQx2tZuuRcDgX6425';

    var viewer = new Cesium.Viewer('mapid', {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        skyAtmosphere: false,
        //sceneMode:Cesium.SceneMode.COLUMBUS_VIEW
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
            url: gisurl,
            token: token,
            proxy:Cesium.DefaultProxy('/proxy/')
        })
    });
    var scene = viewer.scene;

    var sp = [-2612351.503398205, 4449909.817409187, 3737593.6462080562];
    var dir = [0.6028652957422838, -0.74667757818742, 0.28111568690085237];
    var up = [-0.0577207521928497, 0.310603450704859, 0.9487854400108203];

    /*viewer.camera.flyTo({
        destination : new Cesium.Cartesian3(sp[0], sp[1], sp[2]),
        orientation : {
            direction : new Cesium.Cartesian3(dir[0], dir[1], dir[2]),
            up : new Cesium.Cartesian3(up[0], up[1], up[2])
        }
    });*/

    /*var imageryLayers = viewer.imageryLayers;
    imageryLayers.removeAll();

    var esri = new Cesium.ArcGisMapServerImageryProvider({
        url: gisurl,
        token: token,
        proxy:Cesium.DefaultProxy('/proxy/')
    });
    imageryLayers.addImageryProvider(esri);*/

    var entities = viewer.entities;

    $('body').click(function(){
        ///var loc = Cesium.Cartographic.fromCartesian(viewer.camera.position);
        //console.log(viewer.camera);
        //console.log(Cesium.Math.toDegrees(loc.longitude) + '===' + Cesium.Math.toDegrees(loc.latitude));
    });


    var addImage = function(lon, lat, img){
        viewer.entities.add({
            position : Cesium.Cartesian3.fromDegrees(lon, lat),
            billboard :{
                image : img,
                distanceDisplayCondition : new Cesium.DistanceDisplayCondition(0, 3000),
                scaleByDistance: new Cesium.NearFarScalar(0, 0.5, 3000, 0.05)
            }
        });
    };

//加五角星
    $.get('data/d.json', function(d){
        //console.log(d);
        for (var i = 0; i <=d.length - 1; i++) {
            //addImage(d[i][0],d[i][1],'images/lk.png');
        }
    }, 'json');

//////////路口处加柱状

/*$.get('data/d.json', function(coordinates){
        console.log(coordinates);
        console.log(coordinates.length);
        console.log(coordinates[1][0]);
        for (var i = 0; i < coordinates.length; i ++) {
            var latitude = coordinates[i][1];
            var longitude = coordinates[i][0];
            var height = 300;

            //Ignore lines of zero height.
            if(height === 0) {
                continue;
            }

            //var color = Cesium.Color.fromHsl((0.6 - (Math.random()*5)), 1.0, 0.5);
            var color = getRandomColor();
            var surfacePosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0);
            var heightPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, height * Math.random()*10);

            //WebGL Globe only contains lines, so that's the only graphics we create.
            var polyline = new Cesium.PolylineGraphics();
            polyline.material = new Cesium.ColorMaterialProperty(color);
            //polyline.material = new Cesium.PolylineGlowMaterialProperty();
            polyline.width = new Cesium.ConstantProperty(3);
            //polyline.followSurface = new Cesium.ConstantProperty(false);
            polyline.positions = new Cesium.ConstantProperty([surfacePosition, heightPosition]);

            //The polyline instance itself needs to be on an entity.
            var entity = new Cesium.Entity({
                //id : seriesName + ' index ' + i.toString(),
                //show : show,
                polyline : polyline,
                //seriesName : seriesName //Custom property to indicate series name
            });

            //Add the entity to the collection.
            entities.add(entity);
        }
    }, 'json');
*/
///////////


    //below:通过id和color改变指定id的line的color
    var changeByLineIdAndColor = function(lineId,lineColor){
        var abc = entities.getById(lineId);
        //console.log(abc);
        if(abc!=null && abc.polyline!=null &&abc.polyline.material!=null&&abc.polyline.material.color!=null){
            abc.polyline.material.color=new Cesium.Color.fromCssColorString(lineColor);
        }
        //console.log(abc);
    }

//加啤酒节处的路网
    var initbeerRouteLine = function(){
            //console.log('333');
           // console.log(featureCollection);
            var addbeerLine = function(coordinates){
               // calcRoute(coordinates);
                //console.log(coordinates);

                var points = [];

                var addSubLine = function(tPoint, spId, epId){
                    entities.add({
                        polyline : {
                            positions : tPoint,
                            width : 15.0,
                            material : new Cesium.PolylineGlowMaterialProperty({
                                //color : getRandomColor(),
                                color : new Cesium.Color.fromCssColorString('#0000ff'),
                                glowPower : 0.25
                            })
                        },
                        id : 'beerline_' + spId + '_' + epId
                    });
                        //console.log('123');
                };
                //console.log('222');

                for(var i=0;i<coordinates.length-1;i+=2){
                    //console.log(coordinates[i][0]);
                    //console.log('111');
                    //console.log(featureCollection);
                    points = [];
                    points.push(Cesium.Cartesian3.fromDegrees(coordinates[i][0], coordinates[i][1]));
                    points.push(Cesium.Cartesian3.fromDegrees(coordinates[i+1][0], coordinates[i+1][1]));

                    addSubLine(points, i+1, i+2);
                    //console.log(entities.getById('line_1_2'));//通过entities的id来访问这个entities实例
                }

            };
            //console.log(totleNumber+"jjjjjjjjjjjjjjjjjj");



         $.get('data/beerRoute2.json', function(beer){
            console.log(beer);
            console.log(beer.length);
            addbeerLine(beer);
            console.log(entities);
            console.log(entities._entities._array[0]._id);

            console.log(entities.getById('beerline_1_2'));//通过entities的id来访问这个entities实例
            console.log(entities.getById('beerline_1_2').polyline.material.color);//访问到颜色属性但不太对
            //entities.getById('line_1_2').polyline.material.color=new Cesium.Color.fromCssColorString('#DA70D6');
            //Above:定向改变entities实例的color

            changeByLineIdAndColor('beerline_1_2','#ff0000');

            console.log(entities.getById('beerline_1_2').polyline.material.color);


        }, 'json');
    };

    //initbeerRouteLine();

//////////////



//加国信体育馆的路网
    var initguoXinGymRouteLine = function(){
            //console.log('333');
           // console.log(featureCollection);
            var addguoXinGymLine = function(coordinates){
                //calcRoute(coordinates);
                //console.log(coordinates);
                console.log(coordinates);
                console.log(coordinates.length);

                var points = [];

                var addSubLine = function(tPoint, spId, epId){
                    entities.add({
                        polyline : {
                            positions : tPoint,
                            width : 15.0,
                            material : new Cesium.PolylineGlowMaterialProperty({
                                //color : getRandomColor(),
                                color : new Cesium.Color.fromCssColorString('#008B8B'),
                                glowPower : 0.25
                            })
                        },
                        id : 'gymline_' + spId + '_' + epId
                    });
                        //console.log('123');
                };
                //console.log('222');

                for(var i=0;i<coordinates.length-1;i+=2){
                    //console.log('111');
                    //console.log(featureCollection);
                    points = [];
                    points.push(Cesium.Cartesian3.fromDegrees(coordinates[i][0], coordinates[i][1]));
                    points.push(Cesium.Cartesian3.fromDegrees(coordinates[i+1][0], coordinates[i+1][1]));

                    addSubLine(points, i+1, i+2);
                    //console.log(entities.getById('line_1_2'));//通过entities的id来访问这个entities实例
                }

            };
            //console.log(totleNumber+"jjjjjjjjjjjjjjjjjj");



         $.get('data/guoXinGymRoute.json', function(gym){
            console.log(gym);
            console.log(gym.length);
            addguoXinGymLine(gym);
            console.log(entities);
            console.log(entities._entities._array[0]._id);

            console.log(entities.getById('gymline_1_2'));//通过entities的id来访问这个entities实例
            console.log(entities.getById('gymline_1_2').polyline.material.color);//访问到颜色属性但不太对
            //entities.getById('line_1_2').polyline.material.color=new Cesium.Color.fromCssColorString('#DA70D6');
            //Above:定向改变entities实例的color
            changeByLineIdAndColor('gymline_1_2','#0000ff');
            console.log(entities.getById('gymline_1_2').polyline.material.color);


        }, 'json');
    };

    //initguoXinGymRouteLine();

//////////////


    //加青岛市内三区处路网--海信数据
    var initqingdaoRouteLine = function(){
            //console.log('333');
           // console.log(featureCollection);
            var addqingroadLine = function(coordinates){
                //calcRoute(coordinates);
                console.log(coordinates);
                console.log(coordinates.length);

                var points = [];


                var addSubLine = function(tPoint,roadId,roadName){
                    entities.add({
                        polyline : {
                            positions : tPoint,
                            width : 15.0,
                            material : new Cesium.PolylineGlowMaterialProperty({
                                //color : getRandomColor(),
                                color : new Cesium.Color.fromCssColorString('#00ff00'),
                                glowPower : 0.25
                            })

                             /*material : new Cesium.PolylineOutlineMaterialProperty({
                                color : getRandomColor(),
                                outlineWidth : 5,
                                outlineColor : Cesium.Color.WHITE
                            })*/
                           //material : getRandomColor()
                           //material : new Cesium.Color.fromCssColorString('#00ff00')
                        },
                         id : roadId,
                        name : roadName

                    });
                        //console.log('123');
                };
                //console.log('222');


                for(var j=0;j<coordinates.length;j++){
                    //console.log(coordinates.length);
                    points = [];
                    for(var i=0;i<coordinates[j].data.length-1;i+=2){
                        //console.log('111');
                        //console.log(featureCollection);
                        points.push(Cesium.Cartesian3.fromDegrees(coordinates[j].data[i + 0], coordinates[j].data[i + 1]));
                        //points.push(Cesium.Cartesian3.fromDegrees(coordinates[i+1][0], coordinates[i+1][1]));

                        //console.log(entities.getById('line_1_2'));//通过entities的id来访问这个entities实例
                    }
                    if(points.length == 2){
                        if(coordinates[j].data[0]!=coordinates[j].data[2] || coordinates[j].data[1]!=coordinates[j].data[3] ){
                            addSubLine(points,coordinates[j].id,coordinates[j].name);
                        }else{
                            console.log(coordinates[j].data[0]+','+coordinates[j].data[1]+';'+coordinates[j].data[2]+','+coordinates[j].data[3]);
                            console.log(points);
                        }
                    }else{
                        addSubLine(points,coordinates[j].id,coordinates[j].name);
                    }
                }


            };
            //console.log(totleNumber+"jjjjjjjjjjjjjjjjjj");

         $.get('data/readQingdaoRoad.php', function(readQing){
            console.log(readQing);
            //console.log(beer.length);
            addqingroadLine(readQing);
            console.log(entities);
            //console.log(entities._entities._array._polyline);
            //console.log(entities.getById('qingline_1_2'));//通过entities的id来访问这个entities实例
            //console.log(entities.getById('qingline_1_2').polyline.material.color);//访问到颜色属性但不太对
            //entities.getById('line_1_2').polyline.material.color=new Cesium.Color.fromCssColorString('#DA70D6');
            //Above:定向改变entities实例的color
//            changeByLineIdAndColor('95000082','#ff0000');
            /*setTimeout(function(){
                changeByLineIdAndColor('95000082','#0000ff');
            }, 10000);
            setInterval(function(){
                changeByLineIdAndColor('95000082',getRandomColor2());
            },10000)*/

/*            setInterval(function(){
                for(var i=0;i<readQing.length;i++){
                    changeByLineIdAndColor(readQing[i].id,getRandomColor2());
                }
                console.log(readQing);
                console.log(readQing.length);
            },15000);*/

            /*function changeColor(id,fun){
                for(var i=0;i<readQing.length;i++){
                    changeByLineIdAndColor(id,fun);
                }
            }

            setInterval(changeColor,20000,readQing[i].id,getRandomColor2());*/
            /*setTimeout(function(){
                changeByLineIdAndColor('96000021','#ff0000');
            }, 3000);*/
            //console.log(entities.getById('qingline_1_2').polyline.material.color);


        }, 'json');
    };

    //initqingdaoRouteLine();
//////////
//方法2：
    var instances = [];
    var initqingdaoRouteLine2 = function(){
            //console.log('333');
           // console.log(featureCollection);
            var addqingroadLine2 = function(coordinates){
               //calcRoute(coordinates);
                console.log(coordinates);

                //var instances = [];
                for(var j=0;j<coordinates.length;j++){
                    points = Cesium.Cartesian3.fromDegreesArray(coordinates[j].data);
                    //for(var i=0;i<coordinates[j].data.length-1;i+=2){
                        //console.log('111');
                        //console.log(featureCollection);
                        //points.push(Cesium.Cartesian3.fromDegrees(coordinates[j].data[i + 0], coordinates[j].data[i + 1]));
                        //points.push(coordinates[j].data[i+0], coordinates[j].data[i+1]);
                        //console.log(entities.getById('line_1_2'));//通过entities的id来访问这个entities实例
                    //}
                    //console.log(points);

                    if(points.length == 2){
                        //console.log('222');
                        if(coordinates[j].data[0]!=coordinates[j].data[2] || coordinates[j].data[1]!=coordinates[j].data[3] ){


                            instances.push(new Cesium.GeometryInstance({
                                geometry : new Cesium.PolylineGeometry({
                                    positions : points,
                                    //positions : Cesium.Cartesian3.fromDegreesArray(points),
                                    //colorsPerVertex:true
                                    width : 15.0
                                }),
                                //name : coordinates[j].name,
                                attributes : {
                                    color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.8),
                                },
                                id :coordinates[j].id
                            }));


                            //跟上法2
                        /*
                        var polyline = new Cesium.PolylineGeometry({
                            positions : points,
                            id : coordinates[j].id,
                            //vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
                            width : 15.0
                        });
                        instances.push(new Cesium.GeometryInstance({
                                //name : coordinates[j].name,
                                geometry : polyline,
                                attributes : {
                                    color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.8),
                                }
                            }));
                            */
                            ///////
                        }else{
                            console.log(coordinates[j].data[0]+','+coordinates[j].data[1]+';'+coordinates[j].data[2]+','+coordinates[j].data[3]);
                            console.log(points);
                        }
                    }else{
                        //console.log('222');
                        instances.push(new Cesium.GeometryInstance({
                                geometry : new Cesium.PolylineGeometry({
                                    positions : points,
                                    //positions : Cesium.Cartesian3.fromDegreesArray(points),
                                    //colorsPerVertex:true
                                    width : 15.0,
                                namestr : coordinates[j].name
                                }),
                                //name : coordinates[j].name,
                                attributes : {
                                    color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.8),
                                },
                                id :coordinates[j].id + '--' + coordinates[j].name
                        }));
                        //跟上法2
                        /*
                        var polyline = new Cesium.PolylineGeometry({
                            positions : points,
                            id : coordinates[j].id,
                            //vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
                            width : 15.0
                        });
                        instances.push(new Cesium.GeometryInstance({
                                //name : coordinates[j].name,
                                geometry : polyline,
                                attributes : {
                                    color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.8),
                                }
                            }));
                        */
                    }
                    //console.log('333');
                    //console.log(points);
                }
                console.log(instances);
                scene.primitives.add(new Cesium.Primitive({
                    geometryInstances : instances,
                    appearance : new Cesium.PolylineColorAppearance()
                }));
            };

        /*var changeByLineIdAndColor2 = function(lineId,lineColor){
            var abc = entities.getById(lineId);
            //console.log(abc);
            if(abc!=null && abc.polyline!=null &&abc.polyline.material!=null&&abc.polyline.material.color!=null){
                abc.polyline.material.color=new Cesium.Color.fromCssColorString(lineColor);
            }
            //console.log(abc);
        }
        */
            $.get('data/readQingdaoRoad.php', function(qing){
                addqingroadLine2(qing);
                console.log(qing);
                console.log(instances);

                setInterval(function(){
                    for(var i=0;i<instances.length;i++){
                        var color1=randomFun(0, 10);
                        if(color1 < 5){
                            color1=0;
                        }else {
                            color1=1;
                        }
                        var color2=randomFun(0, 10);
                        if(color2 < 5){
                            color2=0;
                        }else {
                            color2=1;
                        }
                        var color3=randomFun(0, 10);
                        if(color3 < 5){
                            color3=0;
                        }else {
                            color3=1;
                        }
                        instances[i].attributes.color = new Cesium.ColorGeometryInstanceAttribute(1, 0,0, 0.8);
                        //changeByLineIdAndColor(instances[i].id,getRandomColor2());
                    }



                    scene.primitives.add(new Cesium.Primitive({
                        geometryInstances : instances,
                        appearance : new Cesium.PolylineColorAppearance()
                    }));


                    console.log(instances.length);
                },5000);




            }, 'json');
    };

    //initqingdaoRouteLine2();

/////////////

    //addImage(120.41417510336478, 36.10710938788021, 'images/2.png');
    //addImage(120.41377576693827, 36.108585842213124, 'images/3.png');
    //addImage(120.41455934701783, 36.10521770081984, 'images/3.png');
    //addImage(120.4129924363682, 36.10653958147912, 'images/2.png');
    //addImage(120.41245181213468, 36.10903878629147, 'images/1.png');

    var addModel = function(start, stop, position){
        var url = 'model/busmodel/55.gltf';
        //console.log('carmodel');
        //var url = 'model/Cesium_Ground.gltf';

        var entity = viewer.entities.add({
            availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                start : start,
                stop : stop
            })]),
            position : position,
            orientation : new Cesium.VelocityOrientationProperty(position),
            model : {
                uri : url,
                maximumPixelSize : 20,
                color: '#ffffff',
                scale: 0.1
            }
        });
        //console.log(entities);
    };

    var calcRoute = function(geometrys){
        var len = geometrys.length;
        console.log(geometrys);
        if(len <= 4) return;

        var start = Cesium.JulianDate.fromDate(new Date());
        var stop = Cesium.JulianDate.addSeconds(start, (len-1) * 5, new Cesium.JulianDate());

        var propery = new Cesium.SampledPositionProperty();
        var propery2 = new Cesium.SampledPositionProperty();
        var propery3 = new Cesium.SampledPositionProperty();
        var propery4 = new Cesium.SampledPositionProperty();
        var propery5 = new Cesium.SampledPositionProperty();
        //console.log("cars");

        for(var i=0;i<len;i++){
            //console.log("carcar");
            var time = Cesium.JulianDate.addSeconds(start, i * 5, new Cesium.JulianDate());
            var pos = Cesium.Cartesian3.fromDegrees(geometrys[i][0], geometrys[i][1], 0);
            propery.addSample(time, pos);

            var time = Cesium.JulianDate.addSeconds(start, (i+2) * 5, new Cesium.JulianDate());
            var pos = Cesium.Cartesian3.fromDegrees(geometrys[i][0], geometrys[i][1], 0);
            propery2.addSample(time, pos);

            var time = Cesium.JulianDate.addSeconds(start, (i+4) * 5, new Cesium.JulianDate());
            var pos = Cesium.Cartesian3.fromDegrees(geometrys[i][0], geometrys[i][1], 0);
            propery3.addSample(time, pos);

            var time = Cesium.JulianDate.addSeconds(start, (i+6) * 5, new Cesium.JulianDate());
            var pos = Cesium.Cartesian3.fromDegrees(geometrys[i][0], geometrys[i][1], 0);
            propery4.addSample(time, pos);

            var time = Cesium.JulianDate.addSeconds(start, (i+8) * 5, new Cesium.JulianDate());
            var pos = Cesium.Cartesian3.fromDegrees(geometrys[i][0], geometrys[i][1], 0);
            propery5.addSample(time, pos);
        }
        ////
        viewer.clock.startTime = start.clone();
        viewer.clock.stopTime = stop.clone();
        viewer.clock.currentTime = start.clone();
        viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
        viewer.clock.multiplier = 10;
        //viewer.timeline.zoomTo(start, stop);
        ////
        addModel(start, stop, propery);
        addModel(start, stop, propery2);
        addModel(start, stop, propery3);
        addModel(start, stop, propery4);
        addModel(start, stop, propery5);
        //console.log("card");
    };

    //addModel();

//////////////
    var initRouteLine = function(){

        //原本的路网

        var bkLine = function(featureCollection){
            var addLine = function(coordinates){
                calcRoute(coordinates);
                //console.log(coordinates);

                var points = [];

                var addSubLine = function(tPoint){
                    entities.add({
                        polyline : {
                            positions : tPoint,
                            width : 15.0,
                            material : new Cesium.PolylineGlowMaterialProperty({
                                color : getRandomColor(),
                                glowPower : 0.25
                            })
                        }
                    });
                    //console.log('123');
                };

                for(var i=0;i<coordinates.length-1;i++){
                    points = [];
                    points.push(Cesium.Cartesian3.fromDegrees(coordinates[i][0], coordinates[i][1]));
                    points.push(Cesium.Cartesian3.fromDegrees(coordinates[i+1][0], coordinates[i+1][1]));

                    addSubLine(points);
                }

            };
            console.log(featureCollection);
            var totleNumber = featureCollection.features.length;
            for (var i = 0; i < totleNumber; i++) {
                var item = featureCollection.features[i];
                addLine(item.geometry.paths[0]);
            }
        };

        //var GeoBulidingServerLayer = L.esri.featureLayer({url: routeurl + "/0", token: token});
        //var query = GeoBulidingServerLayer.query().run(bkLine);
        //GeoBulidingServerLayer = null;
        $.get('data/route.json', function(d){
        bkLine(d);

        }, 'json');
    };

    initRouteLine();

    var addRectangle = function(coordinate){
        entities.add({
            polygon : {
                hierarchy : new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(coordinate)),
                material: Cesium.Color.WHITE.withAlpha(0.2),
                outline: true,
                outlineColor: Cesium.Color.WHITE.withAlpha(1),
                outlineWidth: 1,
                extrudedHeight: randomFun(10, 50)
            }
        });
    };

/////////////////加线框建筑---合肥路自画样例
    var initPolygon = function(featureCollection){
        var arrToList = function(arr){
            var res = [];
            for(var i=0;i<arr.length;i++){
                res.push(arr[i][0]);
                res.push(arr[i][1]);
            }
            return res;
        };
        var geomePoints = [];

        var totleNumber = featureCollection.features.length;
        for (var i = 0; i < totleNumber; i++) {
            var item = featureCollection.features[i];
            //if(item.geometry.type == 'Polygon'){
                addRectangle(arrToList(item.geometry.rings[0]));
            //}

        }

    };

    $.get('data/build.json', function(d){
        initPolygon(d);

    }, 'json');
////////////////////

//加青岛路网数据

    var mapbklines = function(ere,featureCollection){
        //console.log('333');
        console.log(featureCollection);

        var addLine = function(coordinates){
            //calcRoute(coordinates);
            //console.log(coordinates);

            var points = [];

            var addSubLine = function(tPoint){
                entities.add({
                    polyline : {
                        positions : tPoint,
                        width : 15.0,
                        material : new Cesium.PolylineGlowMaterialProperty({
                            color : getRandomColor(),
                            glowPower : 0.25
                        })
                    }
                });
                    //console.log('123');
            };
            //console.log('222');
            for(var i=0;i<coordinates.length-1;i++){
                //console.log('111');
                //console.log(featureCollection);
                points = [];
                points.push(Cesium.Cartesian3.fromDegrees(coordinates[i][0], coordinates[i][1]));
                points.push(Cesium.Cartesian3.fromDegrees(coordinates[i+1][0], coordinates[i+1][1]));

                addSubLine(points);
            }

        };
        var totleNumber = featureCollection.features.length;
        //console.log(totleNumber+"jjjjjjjjjjjjjjjjjj");
        for (var i = 0; i < totleNumber; i++) {
            var item = featureCollection.features[i];
            addLine(item.geometry.coordinates);
        }

    };




    var GeoBulidingServerLayer2 = L.esri.featureLayer({url: gisurl3 + "/0", token: token});
    var query = GeoBulidingServerLayer2.query();
    //console.log(query);
    //query.where('OBJECTID<1000').run(mapbklines);
    //query.where('OBJECTID>=1000 && OBJECTID<2000').run(mapbklines);
    //query.where('OBJECTID>=2000').run(mapbklines);
    //GeoBulidingServerLayer2 = null;
    //console.log('123');

/////////

///////////从arcgis上导入build的经纬度信息针对Demo1的
    var qingdaoBuildDemoCoor1 = function(ere,featureCollection){
        console.log(featureCollection);
        console.log(featureCollection.features.length);
        console.log(featureCollection.features[0].geometry.coordinates.length);
        var str = '';
        //str.push('[');
        str=str+'[';
        //console.log(str);
        for(i=0;i<featureCollection.features.length;i++){
            str = str  + '\n'+ '\t' +'['
            for(j=0;j<featureCollection.features[i].geometry.coordinates.length;j++){
                if(j==featureCollection.features[i].geometry.coordinates.length-1){
                    str=str + featureCollection.features[i].geometry.coordinates[j][0] + ',' + featureCollection.features[i].geometry.coordinates[j][1];
                }else{
                    str=str + featureCollection.features[i].geometry.coordinates[j][0] + ',' + featureCollection.features[i].geometry.coordinates[j][1] +',';
                }

            }
            if(i==featureCollection.features.length-1){
                str=str + ']';
            }else{
                str=str + ']' + ',';
            }

        }
        str=str+ '\n' +']';
        console.log(str);

    };

    //var qingdaoBuildDemoCoorInfo1 = L.esri.featureLayer({url: gisurl4 + "/0", token: token});
    //var query1 = qingdaoBuildDemoCoorInfo1.query().run(qingdaoBuildDemoCoor1);
    //qingdaoBuildDemoCoorInfo1 = null;
///////////////

///////////从arcgis上导入build的经纬度信息针对Demo2的
    var qingdaoBuildDemoCoor2 = function(ere,featureCollection){
        console.log(featureCollection);
        console.log(featureCollection.features.length);
        console.log(featureCollection.features[0].geometry.coordinates.length);
        var str = '';
        //str.push('[');
        str=str+'[';
        //console.log(str);
        for(i=0;i<featureCollection.features.length;i++){
            str = str  + '\n'+ '\t' +'['
            for(j=0;j<featureCollection.features[i].geometry.coordinates[0].length;j++){
                if(j==featureCollection.features[i].geometry.coordinates[0].length-1){
                    str=str + featureCollection.features[i].geometry.coordinates[0][j][0] + ',' + featureCollection.features[i].geometry.coordinates[0][j][1];
                }else{
                    str=str + featureCollection.features[i].geometry.coordinates[0][j][0] + ',' + featureCollection.features[i].geometry.coordinates[0][j][1] +',';
                }

            }
            if(i==featureCollection.features.length-1){
                str=str + ']';
            }else{
                str=str + ']' + ',';
            }

        }
        str=str+ '\n' +']';
        //console.log(str);

    };

    var qingdaoBuildDemoCoorInfo2 = L.esri.featureLayer({url: gisurl5 + "/0", token: token});
    //var query2 = qingdaoBuildDemoCoorInfo2.query().run(qingdaoBuildDemoCoor2);
   // console.log(query2);


    var query2 = qingdaoBuildDemoCoorInfo2.query();
    //console.log(query2);
    query2.where('FID<1000').run(qingdaoBuildDemoCoor2);
    query2.where('FID>=1000').run(qingdaoBuildDemoCoor2);

    //qingdaoBuildDemoCoorInfo2 = null;
///////////////


/////////线框建筑demo1
/*
       $.get('data/qingdaoBuildDemo1.json', function(build){
            console.log(build);
            for(i=0;i<build.length;i++){
                addRectangle(build[i]);
            }

    }, 'json');*/
/////////

/////////线框建筑demo2
       $.get('data/qingdaoBuildDemo2.json', function(build){
            console.log(build);
            var num=0;
            for(i=0;i<build.length;i++){
                addRectangle(build[i]);
                num=i;
            }
            console.log(num);

    }, 'json');
/////////

}
start();