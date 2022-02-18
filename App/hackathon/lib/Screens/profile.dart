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
              CircleAvatar(backgroundImage: NetworkImage(constant.img),),
              Text(constant.name),
              Text(constant.email),
              ElevatedButton(onPressed: () {
                SignOutMethod(context);
              }, child: Text("SIGN OUT"))
            ],
          ),
        ),
      ),
    );
  }
}