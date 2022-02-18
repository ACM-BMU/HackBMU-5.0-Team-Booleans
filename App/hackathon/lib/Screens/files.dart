import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';




class Files extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();

}





class _MyHomePageState extends State<Files> {
  File? file;

  String url = "";
  var name;
  var color1 = Colors.redAccent[700];


  @override
  Widget build(BuildContext context) {

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Column(
        children: [
          Padding(
              padding: EdgeInsets.fromLTRB(15.0, 30.0, 0.0, 0.0),
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'UPLOAD',
                      style: GoogleFonts.poppins(
                        fontSize: 40.0,

                      ),
                    ),
                    Row(
                      children: [
                        Text('Upload your files',
                          style: GoogleFonts.poppins(),),


                      ],
                    ),
                    Center(

                      child: Lottie.network(
                        'https://assets7.lottiefiles.com/packages/lf20_kwi9lo1z.json',
                        height: 400,
                      ),
                    ),
                    Padding(

                      padding: EdgeInsets.only(
                          top: 0.0, left: 45.0, right: 20.0),
                      child: ElevatedButton(onPressed: ()
                      { getfile();
                     },


                        child: const Text('SUBMIT'),
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


                  ])
          )
        ],
      ),
    );
  }

  getfile() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['pdf', 'doc'],
    );

    if (result != null) {
      File c = File(result.files.single.path.toString());
      setState(() {
        file = c;
        name = result.names.toString();
      });
      uploadFile();
    }
  }



  uploadFile() async {
    try {
      var imagefile =
      FirebaseStorage.instance.ref().child("Assignments/S1").child("/$name");
      UploadTask task = imagefile.putFile(file!);
      TaskSnapshot snapshot = await task;
      url = await snapshot.ref.getDownloadURL();

      print(url);
      if (url != null && file != null) {
        Fluttertoast.showToast(
          msg: "Done Uploaded",
          textColor: Colors.red,
        );
      } else {
        Fluttertoast.showToast(
          msg: "Something went wrong",
          textColor: Colors.red,
        );
      }
    } on Exception catch (e) {
      Fluttertoast.showToast(
        msg: e.toString(),
        textColor: Colors.red,
      );
    }
  }
}