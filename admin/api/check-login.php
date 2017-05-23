<?php
  session_start();
  if(isset($_SESSION['userID']))
    echo '{"status":"ok"}';
  else
    echo '{"status":"error"}';
