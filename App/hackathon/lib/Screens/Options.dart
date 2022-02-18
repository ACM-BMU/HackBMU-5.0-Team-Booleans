
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:lottie/lottie.dart';

import 'class.dart';
import 'home.dart';
import 'login.dart';





final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: [
      'emial'
    ]
);





class Options extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();

}





class _MyHomePageState extends State<Options> {

  GoogleSignInAccount? _currentUser;

  @override
  void initState() {
    _googleSignIn.onCurrentUserChanged.listen((account){
      setState(() {
        _currentUser = account;
      });
    });
    _googleSignIn.signInSilently();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    GoogleSignInAccount? user = _currentUser;
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body:
      Column(

        children: [
          Padding(
              padding: EdgeInsets.fromLTRB(15.0, 70.0, 0.0, 0.0),
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'JOIN AS ?',
                      style: GoogleFonts.poppins(
                        fontSize: 40.0,
                        color: Colors.white,

                      ),
                    ),
                    Row(
                      children: [
                        Text('Choose your duty',
                          style: GoogleFonts.poppins(
                            color: Colors.white,
                          ),),


                      ],
                    ),
                    Center(

                      child: Lottie.network(
                        'https://assets5.lottiefiles.com/private_files/lf30_Fy9W8c.json',
                        height: 400,
                      ),
                    ),
                    Row(
                    children: [Padding(

                      padding: EdgeInsets.only(
                          top: 0.0, ),
                      child: ElevatedButton(onPressed:() {
                        Navigator.push(context,
                            MaterialPageRoute(
                                builder: (context) => Home()));
                      },

                        child: const Text('TEACHER'),
                        style: ElevatedButton.styleFrom(

                          minimumSize: Size(180,50),
                          textStyle: GoogleFonts.poppins(fontSize: 24,),
                          primary: Colors.orange,
                          onPrimary: Colors.white,
                          elevation: 10,
                          shadowColor: Colors.black,


                        ),
                      ),
                    ),
                      SizedBox(
                        width: 10,
                      ),

                      ElevatedButton(onPressed:() {
                        Navigator.push(context,
                            MaterialPageRoute(
                                builder: (context) => Home()));
                      },

                        child: const Text('STUDENT'),
                        style: ElevatedButton.styleFrom(

                          minimumSize: Size(180,50),
                          textStyle: GoogleFonts.poppins(fontSize: 24,),
                          primary: Colors.orange,
                          onPrimary: Colors.white,
                          elevation: 10,
                          shadowColor: Colors.black,


                        ),
                      ),
    ]
                    ),
                    SizedBox(height: 20.0,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('Dont Have an Accout ?' ,
                          style: GoogleFonts.poppins(
                            color: Colors.white,
                          ),),
                        SizedBox(width: 5.0,),
                        InkWell(
                          onTap: () {
                            Navigator.push(context,
                                MaterialPageRoute(builder: (context) => Login()));
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
      backgroundColor: Colors.black12,
    );



  }
  void signOut()
  {
    _googleSignIn.disconnect();
  }
  Future<void> signIn() async{
    try{
      await _googleSignIn.signIn();
    }catch (e){
      print('Error signing in $e ');
    }
  }
}

