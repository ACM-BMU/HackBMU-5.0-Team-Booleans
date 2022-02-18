import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hackathon/Screens/signup.dart';
import 'package:hackathon/Services/auth.dart';
import 'package:hackathon/constant.dart';

class Profile extends StatefulWidget {

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  SignOutMethod(context) async
  {
    await signOut();
    Navigator.pushReplacement(context,MaterialPageRoute(builder: (context) => Signup()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:SafeArea(
        child: Center(

          child: Column(

            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [

              Text(
                'Profile',
                style: GoogleFonts.poppins(
                  fontSize: 40.0,

                ),
              ),
              Row(
                children: [
                  Text('View Yourself :)',
                    style: GoogleFonts.poppins(),),


                ],
              ),
             Padding(padding: EdgeInsets.fromLTRB(150,30,100,10),
              child : CircleAvatar(backgroundImage: NetworkImage(constant.img),radius: 40,),),
              SizedBox(
                height: 20,
              ),
              Padding(padding: EdgeInsets.fromLTRB(150, 30, 100, 1),
              child: Text(constant.name, textAlign: TextAlign.center,style: GoogleFonts.poppins(
                fontSize: 30
              ),),),
              SizedBox(height: 20,),
          Padding(padding: EdgeInsets.fromLTRB(130, 1, 100, 10),
            child:
              Text(constant.email,style: GoogleFonts.poppins(
                  fontSize: 20
              )),),
              SizedBox(height: 40,),
          Padding(padding: EdgeInsets.fromLTRB(130, 30, 100, 10),
            child:
              ElevatedButton(onPressed: () {
                SignOutMethod(context);
              }, child: Text("SIGN OUT",style: GoogleFonts.poppins(
                fontSize: 20
              ),)))
            ],
          ),
        ),
      ),
    );
  }
}