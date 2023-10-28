function main(splash, args)
  assert(splash:go(args.url))
  assert(splash:wait(0.5))
  assert(splash:runjs[[
        let searchInput = document.querySelector("#txtBuscar");
    	searchInput.value = "moviliario urbano"
    	document.querySelector("#btnBuscar").click()
  ]])
  return {
    html = splash:html(),
    png = splash:png(),
    har = splash:har(),
  }
end
