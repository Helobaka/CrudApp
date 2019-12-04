using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class PeopleController : Controller
    {
        // GET: People
        public List<PeopleModel> Index()
        {
            using (PeopleContext db = new PeopleContext())
            {
                //PeopleModel user1 = new PeopleModel { Name = "Tom", Patronymic  = "33",Surname="f" };
                //PeopleModel user2 = new PeopleModel { Name = "Alice", Patronymic  ="a", Surname="j" };
                //PeopleModel user3 = new PeopleModel { idPeoples=1 };
                //db.Peoples.Remove(user3);
                //db.Peoples.Add(user1);
                //db.Peoples.Add(user2);
                //db.SaveChanges();
                var peoples = db.Peoples.ToList();

                return peoples;
            }

        }
        [HttpGet]
        public List<PeopleModel> PeopleCreate(string Name, string Patronymic, string Surname, string Comment)
        {
            using (PeopleContext db = new PeopleContext())
            {
                PeopleModel NewPeople = new PeopleModel();
                NewPeople.Comment = Comment;
                NewPeople.Surname = Surname;
                NewPeople.Patronymic = Patronymic;
                NewPeople.Name = Name;
                db.Peoples.Add(NewPeople);
                db.SaveChanges();
                var peoples = db.Peoples.ToList();
                return peoples;
            }
        }


        public List<PeopleModel> PeopleUpdate(string Name, string Patronymic, string Surname, string Comment, string Id)
        {
            using (PeopleContext db = new PeopleContext())
            {

                if (Int32.TryParse(Id, out int IdPep))
                {
                    PeopleModel NewPeople = new PeopleModel();
                    NewPeople.IdPeoples = IdPep;
                    NewPeople.Comment = Comment;
                    NewPeople.Surname = Surname;
                    NewPeople.Patronymic = Patronymic;
                    NewPeople.Name = Name;
                    try
                    {
                        db.Peoples.Update(NewPeople);
                        db.SaveChanges();
                    }
                    catch { }
                }
                var peoples = db.Peoples.ToList();
                return peoples;
            }
        }

        public List<PeopleModel> PeopleDelete(string Id)
        {
            using (PeopleContext db = new PeopleContext())
            {

                if (Int32.TryParse(Id, out int IdPep))
                {
                    db.SaveChanges();
                    PeopleModel NewPeople = new PeopleModel();
                    NewPeople.IdPeoples = IdPep;
                    try
                    {
                        db.Peoples.Remove(NewPeople);
                        db.SaveChanges();
                    }
                    catch { }
                }
                var peoples = db.Peoples.ToList();
                return peoples;
            }
        }

        // GET: People/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: People/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: People/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: People/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: People/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: People/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: People/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}