import * as t from 'three'

const main = () => {
  let on = true
  const button = document.getElementById('b') as HTMLButtonElement
  button.onclick = toggle

  const canvas = document.getElementById('c') as HTMLCanvasElement
  const renderer = new t.WebGLRenderer({canvas})
  const fov = 75
  const aspect = 2  // the canvas default
  const near = 0.1
  const far = 5;
  const camera = new t.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 2

  const scene = new t.Scene()
  const boxWidth = 1
  const boxHeight = 1
  const boxDepth = 1
  const geometry = new t.BoxGeometry(boxWidth, boxHeight, boxDepth)

  const makeCube = (geometry: t.Geometry, color: number, textureName: string, x: number) => {
    const material = new t.MeshBasicMaterial({color, map: t.ImageUtils.loadTexture(`textures/${textureName}`)})
    const cube = new t.Mesh(geometry, material)
    cube.position.x = x
    return cube
  }

  const cubes = [
    makeCube(geometry, 0x00FFFF, 'reece.jpeg', -2),
    makeCube(geometry, 0xFFFF00, 'dillon.png', 0),
    makeCube(geometry, 0xFF00FF, 'yujan.png', 2),
  ]

  cubes.forEach(c => scene.add(c))

  {
    const color = 0xFFFFFF
    const intensity = 1
    const light = new t.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)
  }

  function render(time: number) {
    if (on) {
      time *= 0.001;  // convert time to seconds

      cubes.forEach((cube, i) => {
        const speed = 1 + i*0.1
        const rot = time * speed
        cube.rotation.x = rot
        cube.rotation.y = rot
        cube.position.x += (Math.random() - 0.5)* 0.1
      })

      renderer.render(scene, camera);
    }
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  function toggle() { on = !on }
}

main()
