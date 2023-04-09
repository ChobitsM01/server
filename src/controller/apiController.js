import loginRegisterService from "../service/loginRegisterService"

const handleRegister = async (req, res) =>
{
  try
  {
    if (!req.body.email || !req.body.phone || !req.body.password)
    {
      console.log('>>check req: ', req.body.email, req.body.phone, req.body.password);
      return res.status(200).json({
        EM: 'Missing required parameters',
        EC: '1',
        DT: '',
      })
    }

    let data = await loginRegisterService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: '',
    })
  }
  catch (e)
  {
    return res.status(500).json({
      EM: 'Eror from server',
      EC: '-1',
      DT: '',
    })
  }

}

const handleLogin = async (req, res) =>
{
  try
  {
    let data = await loginRegisterService.handleUserLogin(req.body);
    //set cookies
    if (data && data.DT && data.DT.access_token)
    {
      res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    }

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT
    })
  } catch (error)
  {
    console.log('check error: ', error);
    return res.status(500).json({
      EM: 'Eror from server',
      EC: '-1',
      DT: '',
    })
  }
}

const handleLogout = (req, res) =>
{
  try
  {
    res.clearCookie('jwt');
    return res.status(200).json({
      EM: 'clear cookie ok!',
      EC: 0,
      DT: ''
    })
  } catch (error)
  {
    console.log('check error: ', error);
    return res.status(500).json({
      EM: 'Eror from server',
      EC: '-1',
      DT: '',
    })
  }
}

module.exports = {
  handleRegister, handleLogin, handleLogout
}