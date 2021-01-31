<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends AbstractController
{
    /**
     * Route par défaut
     * Affiche de l'application React
     * 
     * @Route("/", name="index")
     *
     * @return Response
     */
    public function index() : Response
    {
        return $this->render('base.html.twig');
    }
}
