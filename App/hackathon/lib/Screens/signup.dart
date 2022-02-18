
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:hackathon/Screens/profile.dart';
import 'package:hackathon/Services/auth.dart';
import 'package:hackathon/constant.dart';
import 'package:lottie/lottie.dart';

import '../localdb.dart';
import 'Options.dart';
import 'class.dart';
import 'home.dart';
import 'login.dart';











class Signup extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();

}





class _MyHomePageState extends State<Signup> {


  Future<void> checkUserLog() async
  {
    final FirebaseAuth auth = await FirebaseAuth.instance;
    final user = await auth.currentUser;
    if(user != null)
    {
      constant.name = (await LocalDataSaver.getName())!;
      constant.email = (await LocalDataSaver.getEmail())!;
      constant.img = (await LocalDataSaver.getImg())!;
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Options()));
    }
  }

  @override
  void initState(){

    checkUserLog();
  }

  signInMethod(context) async
  {
    await signInWithGoogle();
    constant.name = (await LocalDataSaver.getName())!;
    constant.email = (await LocalDataSaver.getEmail())!;
    constant.img = (await LocalDataSaver.getImg())!;
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Options()));
  }


  @override
  Widget build(BuildContext context) {

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Column(
        children: [
          Padding(
              padding: EdgeInsets.fromLTRB(15.0, 70.0, 0.0, 0.0),
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Signup',
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
                    Center(

                      child: Lottie.network(
                        'https://assets10.lottiefiles.com/packages/lf20_xrC7ik.json',
                        height: 400,
                      ),
                    ),
                    Padding(

                      padding: EdgeInsets.only(
                          top: 0.0, left: 45.0, right: 20.0),
                      child: ElevatedButton(onPressed: ()
                      { signInMethod(context);


                        },


                        child: const Text('Join Now'),
                        style: ElevatedButton.styleFrom(

                          minimumSize: Size(280, 50),
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
                        Text('Dont Have an Accout ?',
                          style: GoogleFonts.poppins(

                          ),),
                        SizedBox(width: 5.0,),
                        InkWell(
                          onTap: () {
                            Navigator.push(context,
                                MaterialPageRoute(builder: (context) =>
                                    Login()));
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
    );
  }



}
