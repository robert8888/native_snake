package com.android.graphics;

import java.lang.ref.WeakReference;
import android.os.AsyncTask;
import android.graphics.Bitmap;
import java.lang.String;
import com.android.graphics.CanvasView;
import java.net.URL;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.io.IOException;
import java.io.InputStream;
import java.lang.Exception;
import java.lang.ref.WeakReference;
import android.graphics.BitmapFactory;

class LoadBitmapAsync extends AsyncTask<String , Void ,String> {
    private WeakReference<CanvasView> viewRef;
    private Bitmap bitmap;
    private String name;

    LoadBitmapAsync(CanvasView view, String name){
        viewRef = new WeakReference<CanvasView>(view);
        this.name = name;
    }

    @Override
    protected String doInBackground(String... strings) {
        URL url;
        HttpURLConnection urlConnection = null;

        try {
            url = new URL(strings[0]);
            urlConnection = (HttpURLConnection) url.openConnection();

            int responseCode = urlConnection.getResponseCode();

            if(responseCode == HttpURLConnection.HTTP_OK){
                InputStream stream = urlConnection.getInputStream();
                BitmapFactory bitmapFactory = new BitmapFactory();
                Bitmap bitmap = bitmapFactory.decodeStream(stream);
                this.bitmap = bitmap;
            }

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        CanvasView view = viewRef.get();
        view.setResourcesBitmap(this.name, this.bitmap);
    }
}