
import'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:slimy_card/slimy_card.dart';


class Class extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
     final subject = TextEditingController();
     final name = TextEditingController();
     final id = TextEditingController();
    return Scaffold(

      body:Container(
        padding: EdgeInsets.all(10),

        child: ListView(children: <Widget>[

          GestureDetector(
            onTap: (){

            },
            child: SlimyCard(
              color: Colors.purpleAccent,


              width: 300,
              topCardHeight: 150,
              bottomCardHeight: 100,
              borderRadius: 15,
              topCardWidget:
              Padding(
              padding: EdgeInsets.only(
                  top: 25.0, left: 0.0, right: 20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                 Container(
                   child: Column(
                   children: [Text('English',textAlign: TextAlign.left,


                  style: GoogleFonts.poppins(
                    fontSize: 25,
                    color: Colors.white,
                  ),
                  ),
                   Text('YASH SIR',textAlign:TextAlign.left,style: GoogleFonts.poppins(
                     fontSize: 20,
                   ),),
                  ]),
                 ),
                            Container(


                                margin: EdgeInsets.only(top:0,left: 70),
                                alignment :Alignment.bottomRight,




                                  child: CircleAvatar(
                                    radius: 45,
                                  ),
                                )





                ],
              ),

              ),
              bottomCardWidget:
              TextField(controller: id,
              style: GoogleFonts.poppins(
                color: Colors.white,
                fontSize: 20,
              ),),



            ),
          ),
          SizedBox(height: 10,),
          GestureDetector(
            onTap: (){

            },
            child: SlimyCard(
              color: Colors.greenAccent,


              width: 300,
              topCardHeight: 150,
              bottomCardHeight: 100,
              borderRadius: 15,
              topCardWidget:
              Padding(
                padding: EdgeInsets.only(
                    top: 25.0, left: 0.0, right: 20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Container(
                      child: Column(
                          children: [Text('DSA',textAlign: TextAlign.left,


                            style: GoogleFonts.poppins(
                              fontSize: 25,
                              color: Colors.white,
                            ),
                          ),
                            Text('B.Babu',textAlign:TextAlign.left,style: GoogleFonts.poppins(
                              fontSize: 20,
                            ),),
                          ]),
                    ),
                    Container(


                      margin: EdgeInsets.only(left: 70),
                      alignment :Alignment.bottomRight,




                      child: CircleAvatar(
                        radius: 45,
                      ),
                    )





                  ],
                ),

              ),
              bottomCardWidget:
              Text('2 Active Tasks!',
                style: GoogleFonts.poppins(
                  color: Colors.white,
                  fontSize: 20,
                ),),




            ),
          ),
          SizedBox(height: 10,),
          GestureDetector(
            onTap: (){

            },
            child: SlimyCard(
              color: Colors.lightBlueAccent,


              width: 300,
              topCardHeight: 150,
              bottomCardHeight: 100,
              borderRadius: 15,
              topCardWidget:
              Padding(
                padding: EdgeInsets.only(
                    top: 25.0, left: 0.0, right: 20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [

                    Container(
                      child: Column(
                          children: [Text('OS',textAlign: TextAlign.left,


                            style: GoogleFonts.poppins(
                              fontSize: 25,
                              color: Colors.white,
                            ),
                          ),
                            Text('S.Swami',textAlign:TextAlign.left,style: GoogleFonts.poppins(
                              fontSize: 20,
                            ),),
                          ]),
                    ),
                    Container(


                      margin: EdgeInsets.only(left: 70),
                      alignment :Alignment.bottomRight,




                      child: CircleAvatar(
                        radius: 45,

                      ),
                    )





                  ],
                ),

              ),


              bottomCardWidget:
              Text('No Active Tasks',
                style: GoogleFonts.poppins(
                  color: Colors.white,
                  fontSize: 20,
                ),),




            ),
          )
        ],),


      )
    );


  }
}

