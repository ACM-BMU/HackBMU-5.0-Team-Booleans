
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hackathon/Screens/signup.dart';











class Login extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();

}





class _MyHomePageState extends State<Login> {


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.fromLTRB(15.0, 110.0, 0.0, 0.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Login',
                  style: GoogleFonts.poppins(
                      fontSize: 40.0,

                  ),
                ),
                Row(
                  children: [
                    Text('Nice to see you here again !',
                    style: GoogleFonts.poppins(),),


                  ],
                ),
                Padding(
                    padding: EdgeInsets.only(
                        top: 35.0, left: 20.0, right: 20.0),
                    child: Column(
                        children: [
                          TextField(
                            decoration: InputDecoration(
                              border: OutlineInputBorder(),
                              labelText: 'Email',
                              prefixIcon: Icon(Icons.mail),
                              labelStyle: GoogleFonts.poppins(



                              ),


                            ),
                            keyboardType: TextInputType.emailAddress,
                            obscureText: true,
                          ),
                          SizedBox(height: 20,),
                          TextField(
                            decoration: InputDecoration(
                              border: OutlineInputBorder(),
                              labelText: 'Password',
                              prefixIcon: Icon(Icons.vpn_key),
                              labelStyle: GoogleFonts.poppins(



                              ),


                            ),
                            obscureText: true,
                            keyboardType: TextInputType.visiblePassword,
                          ),
                          SizedBox(height: 30.0,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [ InkWell(
                              child: Text('Forgot Password ?',
                                style: GoogleFonts.poppins(
                                  color: Colors.black,


                                ),),
                              onTap: () {

                              },
                            ),
                            ],
                          ),
                          SizedBox(height: 40.0,),
                          Container(

                            decoration: BoxDecoration(
                                boxShadow: [BoxShadow(

                                  color: Colors.black,
                                  spreadRadius: 1,
                                  offset: Offset(4,4),

                                )
                                ]
                            ),
                            child: ElevatedButton(onPressed:() {} , child: const Text('Login'),
                              style: ElevatedButton.styleFrom(

                                minimumSize: Size(280,50),
                                textStyle: GoogleFonts.poppins(fontSize: 24,),
                                primary: Colors.orange,
                                onPrimary: Colors.white,
                                elevation: 10,
                                shadowColor: Colors.black,


                              ),
                            ),


                          ),
                          SizedBox(height: 20.0,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text('Dont Have an Accout ?' ,
                                style: GoogleFonts.poppins(

                                ),),
                              SizedBox(width: 5.0,),
                              InkWell(
                                onTap: () {
                                  Navigator.push(context,
                                      MaterialPageRoute(builder: (context) => Signup()));
                                },
                                child: Text('Register', style: GoogleFonts.poppins(
                                  fontWeight: FontWeight.bold,

                                  color: Colors.orange,
                                ),),
                              ),
                            ],
                          )

                        ])
                )
              ],
            ),
          ),
        ],
      ),
    );
  }}

