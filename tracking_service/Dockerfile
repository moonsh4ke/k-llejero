# Imagen de base para la construcción
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Instalar herramienta de línea de comandos de EF Core
RUN dotnet tool install --global dotnet-ef --version 6.*
ENV PATH="$PATH:/root/.dotnet/tools"

# Copiar proyectos
COPY TrackingService/ ./TrackingService/
COPY TrackingService.Domain/ ./TrackingService.Domain/
COPY TrackingService.Repositories/ ./TrackingService.Repositories/
COPY TrackingService.Services/ ./TrackingService.Services/

# Restaurar dependencias
WORKDIR /app/TrackingService
RUN dotnet restore ./TrackingService.sln

# Entity framework
#RUN dotnet ef migrations add Initial2 --project /app/TrackingService.Repositories --startup-project /app/TrackingService
#RUN dotnet ef database update

# Publicar la API
RUN dotnet publish ./TrackingService.sln -c Release -o out

# Imagen de base para ejecutar la aplicación
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/TrackingService/out .
ENTRYPOINT ["dotnet", "TrackingServiceAPI.dll"]