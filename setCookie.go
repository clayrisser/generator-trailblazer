package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"strings"
	"time"
)

type Settings struct {
	Port string
}

type CookiePackage struct {
	Name     string    `json:"name"`
	Value    string    `json:"value"`
	Domain   string    `json:"domain"`
	HttpOnly bool      `json:"httpOnly"`
	Expires  time.Time `json:"expires"`
	Secure   bool      `json:"secure"`
	Path     string    `json:"string"`
}

type ResponseBody struct {
	Message string `json:"message"`
}

func setCookie(w http.ResponseWriter, r *http.Request) {
	cookiePackage := CookiePackage{
		Name:     "",
		Value:    "",
		Domain:   r.Host[:strings.Index(r.Host, ":")],
		HttpOnly: true,
		Expires:  time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC),
		Path:     "/",
		Secure:   true,
	}
	cookieJSON := r.URL.Query().Get("cookie")
	json.Unmarshal([]byte(cookieJSON), &cookiePackage)
	cookie := http.Cookie{
		Name:     cookiePackage.Name,
		Value:    cookiePackage.Value,
		Domain:   cookiePackage.Domain,
		HttpOnly: cookiePackage.HttpOnly,
		Expires:  cookiePackage.Expires,
		Secure:   cookiePackage.Secure,
		Path:     cookiePackage.Path,
	}
	http.SetCookie(w, &cookie)
	w.Header().Set("Content-Type", "application/json")
	resBody, _ := json.Marshal(ResponseBody{
		Message: "Cookie set for " + r.Host,
	})
	w.WriteHeader(http.StatusOK)
	w.Write(resBody)
}

func main() {
	settings := Settings{Port: ":8804"}
	http.HandleFunc("/", setCookie)
	listener, err := net.Listen("tcp", settings.Port)
	if err != nil {
		fmt.Println("Failed to listen")
		os.Exit(1)
	}
	log.Printf("%v", "Server listening at localhost"+settings.Port)
	http.Serve(listener, nil)
}
