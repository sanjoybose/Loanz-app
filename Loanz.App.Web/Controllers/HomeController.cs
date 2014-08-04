using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LOANZ_MVC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "LOANZ - Home";

            return View();
        }

        public ActionResult Application()
        {
            ViewBag.Message = "LOANZ - Application";

            return View();
        }

        public ActionResult Congratulation()
        {
            ViewBag.Message = "LOANZ - Congratulation";

            return View();
        }

        public ActionResult What_We_Do()
        {
            return View();
        }

        public ActionResult Meet_Our_Team()
        {
            return View();
        }

        public ActionResult Faq()
        {
            return View();
        }

        public ActionResult Borrow()
        {
            return View();
        }
        public ActionResult Lending_Statement()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }

    }
}
