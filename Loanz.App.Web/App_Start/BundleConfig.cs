using System.Web;
using System.Web.Optimization;

namespace LOANZ_MVC
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/scripts/jquery").Include(
                        "~/Scripts/jquery-1.11.0.js",
                        "~/Scripts/bootstrap.js"
                        ));

            bundles.Add(new ScriptBundle("~/scripts/jqueryui").Include(
                        "~/Scripts/jquery-ui.js"
                        ));

            bundles.Add(new ScriptBundle("~/scripts/kendoslider").Include(
                        "~/Scripts/kendo.all.js",
                        "~/Scripts/kendo.slider.js"
                        ));
            bundles.Add(new ScriptBundle("~/scripts/carousel").Include("~/Scripts/jquery.flexisel.js"));

            bundles.Add(new ScriptBundle("~/scripts/ko").Include(
                        "~/Scripts/knockout-3.1.0.js",
                        "~/Scripts/knockout.mapping-2.4.1.js"
                        ));

            bundles.Add(new ScriptBundle("~/scripts/ko-kendo").Include(
                        "~/Scripts/knockout-kendo.js"
                        ));

            bundles.Add(new ScriptBundle("~/scripts/validator").Include(
                        "~/Scripts/validator.js",
                        "~/Scripts/multifield.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/css/jqueryui").Include("~/Content/css/jquery-ui.css"));

            bundles.Add(new StyleBundle("~/Content/css/bootstrap").Include("~/Content/css/bootstrap.css"));

            bundles.Add(new StyleBundle("~/Content/css/style").Include("~/Content/css/style.css"));
            bundles.Add(new StyleBundle("~/Content/css/component").Include("~/Content/css/component.css"));

            bundles.Add(new StyleBundle("~/Content/css/normalize").Include("~/Content/css/normalize.css"));

            bundles.Add(new StyleBundle("~/Content/css/index").Include("~/Content/css/index-style.css",
                "~/Content/css/index-slider.css"));

            bundles.Add(new StyleBundle("~/Content/css/application").Include("~/Content/css/index-style.css", "~/Content/css/application-style.css",
                "~/Content/css/application-slider.css"));

            bundles.Add(new StyleBundle("~/Content/css/congratulation").Include("~/Content/css/index-style.css",
                "~/Content/css/cong-fail-style.css"));

            bundles.Add(new StyleBundle("~/Content/css/kendotheme").Include("~/Content/css/kendo.blueopal.css",
                "~/Content/css/kendo.common.css",
                "~/Content/css/kendo.dataviz.blueopal.css",
                "~/Content/css/kendo.dataviz.css"));


        }
    }
}