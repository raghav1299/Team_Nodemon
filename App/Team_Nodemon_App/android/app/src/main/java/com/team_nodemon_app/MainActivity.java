package com.team_nodemon_app;
import android.os.Bundle;
import android.view.View;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
    @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    hideNavigationBar();
  }

  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) {
      hideNavigationBar();
    }
  }

  private void hideNavigationBar() {
    getWindow().getDecorView()
        .setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);

  }

  @Override
  protected String getMainComponentName() {
    return "Team_Nodemon_App";
  }
}
