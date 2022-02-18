import 'package:bottom_navy_bar/bottom_navy_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hackathon/Screens/profile.dart';

import 'package:url_launcher/url_launcher.dart';

import 'class.dart';
import 'files.dart';



class Home extends StatefulWidget {


  @override
  State<Home> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<Home> {

  int _currentIndex = 0;
  late PageController _pageController;
  List <Widget> _widgetOptions = <Widget>[
    Class(),
    Files(),
    Text('About'),
    Profile(),
  ];
  void _onTap(int index)
  {
    setState(() {
      _currentIndex = index;

    });
  }

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }
  @override
  void openUrl() {
    String url1 = "https://yashportfolio.netlify.app/";
    launch(url1);
  }
  _launch() async {
    const url = 'https://yashportfolio.netlify.app/';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(onPressed: (){ _launch();} ,
        icon: Icon(Icons.face))    ],

        centerTitle: true,title: Text("PROFESSOR",style: GoogleFonts.poppins(

        fontSize: 30,
        color:Colors.white,
      ) ),
        backgroundColor: Colors.orange,),
      body: Center(
        child: _widgetOptions.elementAt(_currentIndex),
      ),
      bottomNavigationBar: BottomNavyBar(
        selectedIndex: _currentIndex,
        backgroundColor: Colors.white,
        animationDuration: Duration(milliseconds: 400),
        onItemSelected: (index) {
          setState(() => _currentIndex = index);
          _pageController.jumpToPage(index);
        },
        items: <BottomNavyBarItem>[
          BottomNavyBarItem(
            title: Text('Classes',style: GoogleFonts.poppins(),),
            icon: Icon(Icons.my_library_books_rounded),
            activeColor:Colors.orange,
            inactiveColor: Colors.black,
          ),
          BottomNavyBarItem(
            title: Text('Files',style: GoogleFonts.poppins()),
            icon: Icon(Icons.file_copy),
            activeColor:Colors.orange,
            inactiveColor: Colors.black,
          ),
          BottomNavyBarItem(
            title: Text('Timetable',style: GoogleFonts.poppins()),
            icon: Icon(Icons.lock_clock_rounded),
            activeColor:Colors.orange,
            inactiveColor: Colors.black,
          ),
          BottomNavyBarItem(
            title: Text('Profile',style: GoogleFonts.poppins()),
            icon: Icon(Icons.person),
            activeColor:Colors.orange,
            inactiveColor: Colors.black,
          ),
        ],
      ),
    );

  }
}
