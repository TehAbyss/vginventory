using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using VgInventory.Infra.WebApi.DataConnectors;
using VgInventory.Infra.WebApi.Models;

namespace VgInventory.Infra.WebApi
{
    public class Startup
    {
        private bool IsDevelopment = true;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            IsDevelopment = env.IsDevelopment();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            if (IsDevelopment)
            {
                services.AddSingleton<IDataConnector<User>>(new MockDataConnector<User>());
                services.AddSingleton<IDataConnector<VideoGame>>(new MockDataConnector<VideoGame>());
            }
            else
            {
                services.AddSingleton<IDataConnector<User>>(new CosmosDbDataConnector<User>());
                services.AddSingleton<IDataConnector<VideoGame>>(new CosmosDbDataConnector<VideoGame>());
            }

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // Allow CORS during development testing so that
                // locally run frontend can access locally run backend
                app.UseCors(x => x
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
